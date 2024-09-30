import React, { useState } from 'react';

// Utility function to format date to MM/DD/YYYY
const formatDateToMMDDYYYY = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date";

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const EventControls = ({ onAddEvent }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleAddEvent = () => {
    if (!eventTitle || !eventDate) {
      alert('Please provide both an event title and date.');
      return;
    }

    // Format date before adding event
    const formattedDate = formatDateToMMDDYYYY(eventDate);

    // Call the parent function to add the event
    onAddEvent({ title: eventTitle, date: formattedDate });

    // Clear the input fields after adding the event
    setEventTitle('');
    setEventDate('');
  };

  return (
    <div id="event-controls" className="flex flex-row justify-center items-center mb-16 p-4 gap-4 sm:gap-6">
      <input
  id="event-title"
  type="text"
  value={eventTitle}
  onChange={(e) => setEventTitle(e.target.value)}
  placeholder="Event Title"
  className="border border-black focus:border-black focus:ring-0 px-3 py-2 rounded w-32 sm:w-40 md:w-48"
/>

      <input
        type="date"
        id="event-date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
        className="border px-3 py-2 rounded w-32 sm:w-40 md:w-48"
      />
      <button
        id="addeventbtn"
        onClick={handleAddEvent}
        className="bg-green-600 text-white px-4 py-2 rounded w-24 sm:w-32 md:w-40"
      >
        Add Event
      </button>
    </div>
  );
};

export default EventControls;
