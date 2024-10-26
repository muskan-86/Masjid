import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { db } from "../firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./output.css";
import "./EventsCalendar.css";
import Loader from "./Loader";
import Footer from "./Footer";
import Navbar from "./Navbar";
import EventForm from "./EventForm";
import WhatsAppButton from "./WhatsAppButton.jsx";
import AnnouncementButton from './AnnouncementButton.jsx';



const formatDateToMMDDYYYY = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date";

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const EventsCalendar = () => {
  const [events, setEvents] = useState([]);
  const [firestoreEvents, setFirestoreEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const calendarRef = useRef(null);
  const [loading, setLoading] = useState(true); // State to track loader status
  const navigate = useNavigate();


  useEffect(() => {
    
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false once done
    }, 500);
    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, "approved_events"), (snapshot) => {
    const fetchedEvents = snapshot.docs.map((doc) => ({
      id: doc.id, // Ensure each event has an ID
      title: doc.data().title,
      start: doc.data().date,
      color: "#009a53", 
    }));
    setFirestoreEvents(fetchedEvents);
  });

  return () => unsubscribe();
}, []);

// Combine Firestore and manually added events
const allEvents = [...events, ...firestoreEvents]; 

  const handleDateClick = (info) => {
    console.log("Clicked on date: ", info.dateStr);
  };

  const handleEventRequestSubmit = () => {
    console.log("Event request submitted successfully.");
    setShowForm(false);
  };

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().refetchEvents();
    }
  }, [allEvents]);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };
  

  const handleEventClick = (eventId) => {
    // Navigate to event details page with the event ID
    navigate(`/event-details/${eventId}`);
  };
  
  
  
  return (
    <div className="overflow-x-hidden">
      <div>
      {loading && <Loader />} {/* Show loader if loading is true */}
        <div  className="relative z-50"data-aos="fade-down">
          <Navbar />
        </div>
        <div className="relative gap-2">
        {/* Other components */}
        {!loading && <AnnouncementButton/>}
        {!loading && < WhatsAppButton/>}

      </div>
      
        {/* Calendar */}
        <div className="mb-2 relative max-w-full h-40 flex justify-center bg-cover-img"
          style={{ backgroundImage: "url('/background.png')" }}>
          <div className="absolute inset-0 bg-white opacity-70 z-10"></div>
          <div className="flex flex-col justify-center items-center max-w-full pb-0 font-serif relative z-20">
            <button
              className="bg-white rounded-full border-4 border-mediumseagreen-300 px-8 py-2 text-mediumseagreen-300 font-bold text-3xl mb-6 font-sans z-20">
              Events Calendar
            </button>
          </div>
        </div>
        {/* Request Event Button */}
        <div className="p-4">
          <div className="flex flex-col justify-center items-center  ">
            <button
              id="request-event-btn"
              className="bg-mediumseagreen-300 text-white px-4 py-2 rounded mx-2 mb-2"
              onClick={handleToggleForm}
            >
              Request
            </button>
            <p className=" mb-4">Request to use Bilal Masjid Facilities for an Event</p>
            
          </div>
        </div>
       

        {/* Event Form */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={handleToggleForm}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <EventForm onSubmit={handleEventRequestSubmit} onClose={handleToggleForm} />
            </div>
          </div>
        )}

        {/* Calendar and Event List */}
        <div id="calendar-and-list" className="flex justify-center lg:flex-row md:flex-row gap-4 md:gap-8 m-10">
  {/* Calendar Container */}
  <div className="w-full max-h-screen md:w-2/4 lg:w-2/3 xl:w-1/2 overflow-y-auto">
    <FullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="dayGridMonth"
      initialDate="2024-10-01"
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      events={allEvents.map(event => ({ ...event, id: event.id }))} // Ensure events have an ID
      dateClick={handleDateClick}
      eventClick={(info) => handleEventClick(info.event.id)} // Handle event click
    />
  </div>

  {/* Event List Container */}
  <div className="w-full md:w-1/3 lg:w-1/3 xl:w-2/4 bg-slate-200 p-4 rounded">
    {allEvents.length > 0 && (
      <div>
        <h2 className="text-xl font-semibold mb-2 pl-5">Event List</h2>
        <ul id="event-items" className="list-disc pl-5">
          {allEvents.map((event) => (
            <li key={event.id} className="flex items-center mb-2" onClick={() => handleEventClick(event.id)}>
              <span className="flex-grow">{`${event.title} - ${event.start ? formatDateToMMDDYYYY(event.start) : "Invalid Date"}`}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
</div>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default EventsCalendar;
