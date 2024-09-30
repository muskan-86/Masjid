import React, { useEffect, useState } from 'react';
import { db } from "../firebase-config"; // Ensure your firebase-config is correct
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import BackButton from './BackButton';

const ApprovedEvents = () => {
  const [approvedEvents, setApprovedEvents] = useState([]);

  useEffect(() => {
    // Real-time listener for approved events
    const unsubscribe = onSnapshot(collection(db, "approved_events"), (snapshot) => {
      const events = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setApprovedEvents(events);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    // Log the ID before deletion
    console.log(`Attempting to delete event with ID: ${id}`);

    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        // Delete the event document from Firestore
        await deleteDoc(doc(db, "approved_events", id));
        // Log success
        console.log(`Event with ID ${id} deleted from Firestore.`);

        // Update local state to reflect the deletion
        setApprovedEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };

  return (
    <div className='bg-white h-full mt-4'>
      <BackButton />
      <h2 className="flex justify-center text-3xl font-bold mb-4">Approved Events</h2>
      <ul>
        {approvedEvents.length > 0 ? (
          approvedEvents.map((event) => (
            <li key={event.id} className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-lg"><span className="text-lg font-semibold">Description:&emsp;</span>{event.description}</p>
              <p className="text-lg"><span className="text-lg font-semibold">Date:&emsp;</span>{event.date}</p>
              <p className="text-lg"><span className="text-lg font-semibold">  Time:&emsp;</span>{event.startTime}&emsp;-&emsp; {event.endTime}</p>
              <p className="text-lg">
                <span className="text-lg font-semibold">Contact Person Name: &emsp;</span>{event.contactName}
              </p>
              <p className="text-lg">
                <span className="text-lg font-semibold">Contact Person Email:&emsp;</span>{event.contactEmail}
              </p>
              <p className="text-lg">
                <span className="text-lg font-semibold">Contact Phone Number:&emsp;</span>{event.contactPhone}
              </p>
              <p>
                {event.posterUrl ? (
                  <img src={event.posterUrl} alt="Event Poster" className="w-full h-auto max-w-xs" onError={(e) => e.target.src = '/path/to/placeholder-image.jpg'} />
                ) : (
                  <span className="text-black">No poster</span>
                )}
              </p>
              <button
                onClick={() => handleDelete(event.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <div className="text-center">No approved events available.</div>
        )}
      </ul>
    </div>
  );
};

export default ApprovedEvents;
