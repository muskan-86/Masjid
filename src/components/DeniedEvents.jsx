import React, { useEffect, useState } from 'react';
import { db } from "../firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import BackButton from './BackButton';

const DeniedEvents = () => {
  const [deniedEvents, setDeniedEvents] = useState([]);

  useEffect(() => {
    // Real-time listener for denied events
    const unsubscribe = onSnapshot(collection(db, "requested_events"), (snapshot) => {
      const events = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((event) => event.status === "denied"); // Filter denied events
      setDeniedEvents(events);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="mt-4">
      <BackButton/>
      <h2 className="flex justify-center text-2xl font-bold mb-4">Denied Events</h2>
      <ul>
        {deniedEvents.map((event) => (
          <li key={event.id} className="p-4 border-b border-gray-200">
             {event.reason && <p className="text-red-500">Reason: {event.reason}</p>}
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p>{event.description}</p>
           

            <p>{event.date}</p>
            <p>{event.atartTime}&emsp;-&emsp; {event.endTime}</p>
            <p>{event.contactName}</p>
            <p>{event.contactEmail}</p>
            <p>{event.contactPhone}</p>
            <p>{event.poster}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeniedEvents;
