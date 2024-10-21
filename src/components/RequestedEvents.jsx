import React, { useEffect, useState } from 'react';
import { db } from "../firebase-config";
import { collection, updateDoc, doc, onSnapshot, addDoc } from "firebase/firestore";
import BackButton from './BackButton';
import { sendEventNotification } from '../services/emailService';
const RequestedEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Real-time listener for requested events
    const unsubscribe = onSnapshot(collection(db, "requested_events"), (snapshot) => {
      const eventData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventData);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  const handleApprove = async (event) => {
    try {
      // Move to approved_events collection
      await addDoc(collection(db, "approved_events"), { ...event, status: "approved" });

      // Update the status in requested_events collection
      await updateDoc(doc(db, "requested_events", event.id), { status: "approved" });

       // Log the email address being sent
    console.log("Sending email to:", event.contactEmail);

    // Send email notification
    await sendEventNotification(event.contactEmail, event, "approved");

      // Remove from local state
      setEvents(events.filter(e => e.id !== event.id));
      console.log("Event approved: ", event.id);
    } catch (error) {
      console.error("Error approving event: ", error);
    }
  };

  const handleDeny = (event) => {
    // Set selected event for the popup
    setSelectedEvent(event);
  };

  const confirmDeny = async (event, reason = "") => {
    try {
      // Add event to denied_events collection
      await addDoc(collection(db, "denied_events"), { ...event, status: "denied", reason });

      // Update status in requested_events collection
      await updateDoc(doc(db, "requested_events", event.id), { status: "denied", reason });

    
  // Log the email address being sent
  console.log("Sending email to:", event.contactEmail);

  // Send email notification
  await sendEventNotification(event.contactEmail, event, "denied", reason);

      // Remove from local state
      setEvents(events.filter(e => e.id !== event.id));
      console.log("Event denied: ", event.id);
    } catch (error) {
      console.error("Error denying event: ", error);
    }
  };

  const handleDenyWithReason = () => {
    const reason = prompt("Please provide a reason for denial:");
    if (reason) {
      confirmDeny(selectedEvent, reason);
    }
    setSelectedEvent(null);
  };

  const handleDenyWithoutReason = () => {
    confirmDeny(selectedEvent);
    setSelectedEvent(null);
  };

  return (
    <div className="mt-4">
      <BackButton />
      <h2 className="flex justify-center text-2xl font-bold mb-4">Requested Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-lg"><span className="text-lg font-semibold">Description:&emsp;</span>{event.description}</p>
            <p className="text-lg"><span className="text-lg font-semibold">Date:&emsp;</span>{event.date}</p>
            <p className="text-lg"><span className="text-lg font-semibold">  Time:&emsp;</span>{event.startTime}&emsp;-&emsp; {event.endTime}</p>
            <p className="text-lg" ><span className="text-lg font-semibold">Contact Person Name: &emsp;</span>{event.contactName}</p>
            <p className="text-lg" ><span className="text-lg font-semibold">Contact Person Email:&emsp;</span>{event.contactEmail}</p>
            <p className="text-lg" ><span className="text-lg font-semibold">Contact Phone Number:&emsp;</span>{event.contactPhone}</p>
            <p>{event.posterUrl ? (
              <img src={event.posterUrl} alt="Event Poster" className="w-full h-auto max-w-xs" onError={(e) => e.target.src = '/path/to/placeholder-image.jpg'} />
            ) : (
              <span className="text-black">No poster</span>
            )}</p>
            <button onClick={() => handleApprove(event)} className="bg-green-500 text-white px-4 py-2 rounded">Approve</button>
            <button onClick={() => handleDeny(event)} className="bg-red-500 text-white px-4 py-2 rounded ml-2">Deny</button>
          </li>
        ))}
      </ul>

      {/* Popup for Deny Options */}
      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Choose Deny Option</h3>
            <button
              onClick={handleDenyWithoutReason}
              className="bg-red-500 text-white px-4 py-2 rounded mr-4"
            >
              Deny Without Reason
            </button>
            <button
              onClick={handleDenyWithReason}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Deny With Reason
            </button>
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestedEvents;
