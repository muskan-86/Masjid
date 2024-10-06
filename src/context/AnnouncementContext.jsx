import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase-config'; 
import { collection, getDocs } from 'firebase/firestore';

const AnnouncementContext = createContext();

export const AnnouncementProvider = ({ children }) => {
    const [announcements, setAnnouncements] = useState([]);

    const fetchAnnouncements = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'announcements'));
            const fetchedAnnouncements = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log('Fetched announcements:', fetchedAnnouncements); // Debug log
            setAnnouncements(fetchedAnnouncements);
        } catch (error) {
            console.error('Error fetching announcements:', error); // Error log
        }
    };

    useEffect(() => {
        fetchAnnouncements(); // Initial fetch when the provider mounts
    }, []);

    return (
        <AnnouncementContext.Provider value={{ announcements, setAnnouncements, fetchAnnouncements }}>
            {children}
        </AnnouncementContext.Provider>
    );
};

export const useAnnouncements = () => {
    return useContext(AnnouncementContext);
};
