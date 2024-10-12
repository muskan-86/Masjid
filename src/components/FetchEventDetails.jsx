import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../firebase-config';

const db = getFirestore(app);

const FetchEventDetails = (eventId) => {
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (eventId) {
        // First, check in the approved_events collection
        const approvedEventDoc = doc(db, 'approved_events', eventId);
        const approvedEventSnapshot = await getDoc(approvedEventDoc);

        if (approvedEventSnapshot.exists()) {
          console.log(`Fetching from approved_events: ${eventId}`);
          setEventDetails(approvedEventSnapshot.data());
          return; // Exit if found in approved_events
        }

        // If not found, check in the events collection
        const eventDoc = doc(db, 'events', eventId);
        const eventSnapshot = await getDoc(eventDoc);

        if (eventSnapshot.exists()) {
          console.log(`Fetching from events: ${eventId}`);
          setEventDetails(eventSnapshot.data());
        } else {
          console.log('No event found!');
        }
      } else {
        console.log('No event ID provided');
      }
    };

    fetchEvent();
  }, [eventId]);

  console.log(`Fetching event with ID: ${eventId}`);
  return eventDetails;
};

export default FetchEventDetails;
