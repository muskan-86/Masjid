import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../firebase-config';

const db = getFirestore(app);

const FetchEventDetails = (eventId) => {
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (eventId) {
        const eventDoc = doc(db, 'approved_events', eventId);
        const eventSnapshot = await getDoc(eventDoc);

        if (eventSnapshot.exists()) {
          setEventDetails(eventSnapshot.data());
        } else {
          console.log('No event found!');
        }
      }
    };

    fetchEvent();
  }, [eventId]);
  console.log('Fetching event with ID:', eventId);


  return eventDetails;
};

export default FetchEventDetails;
