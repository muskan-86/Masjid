import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FetchEventDetails from './FetchEventDetails'; // Adjust the path as needed

const EventDetails = () => {
  const { eventId } = useParams(); // Get the event ID from the URL
  const eventDetails = FetchEventDetails(eventId); // Fetch event details
  const navigate = useNavigate(); // Get navigate function for navigation
  console.log('Fetching event with ID:', eventId); 
  
  if (!eventDetails) {
    return <div>Loading...</div>; // Show loading state
  }

  const handleClose = () => {
    navigate(-1); 
  };

  return (
    <div className="event-details p-6 bg-white rounded shadow-md">
      <div className="mb-2 bg-mediumseagreen-300 text-white">
      <p><strong> {eventDetails.date}</strong></p>
      <p><strong> {eventDetails.startTime}&emsp;-&emsp; {eventDetails.endTime}</strong></p>
      </div>
       
       <br/>
       <br/>
      <h1 className="text-4xl font-bold mb-4">{eventDetails.title}</h1>
      
     
      <p className="mb-2 text-2xl">{eventDetails.description}</p>
      <p className="mb-2"><strong>Contact Person:</strong> {eventDetails.contactName}</p>
      <p className="mb-2"><strong>Contact Email:</strong> {eventDetails.contactEmail}</p>
      <p className="mb-2"><strong>Contact Phone:</strong> {eventDetails.contactPhone}</p>
      
      {eventDetails.posterUrl && (
        <div className="mt-4">
          <h2 className="font-semibold">Event Poster:</h2>
          <img src={eventDetails.posterUrl} alt="Event Poster" className="mt-2 max-w-full rounded" />
        </div>
      )}
      
      {/* Close Button */}
      <button 
        onClick={handleClose} 
        className="mt-4 bg-gray-300 text-black px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  );
};

export default EventDetails;
