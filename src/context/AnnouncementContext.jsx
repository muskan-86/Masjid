import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase-config'; 
import { collection, getDocs } from 'firebase/firestore';

const AnnouncementContext = createContext();

export const AnnouncementProvider = ({ children }) => {
    const [announcements, setAnnouncements] = useState([]);

    // Function to fetch announcements from Firestore
    const fetchAnnouncements = async () => {
        const querySnapshot = await getDocs(collection(db, 'announcements'));
        const fetchedAnnouncements = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setAnnouncements(fetchedAnnouncements);
    };

    useEffect(() => {
        fetchAnnouncements(); // Fetch announcements on provider mount
    }, []);

    return (
        <AnnouncementContext.Provider value={{ announcements, setAnnouncements }}>
            {children}
        </AnnouncementContext.Provider>
    );
};

export const useAnnouncements = () => {
    return useContext(AnnouncementContext);
};
