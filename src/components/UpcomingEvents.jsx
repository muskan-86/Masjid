// src/components/UpcomingEvents.jsx

import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import BackButton from './BackButton';

const UpcomingEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsCollection = collection(db, 'events');
                const eventsSnapshot = await getDocs(eventsCollection);
                const eventsList = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                
                // Sort events by order property (ascending)
                const sortedEvents = eventsList.sort((a, b) => (a.order || 0) - (b.order || 0));
                setEvents(sortedEvents);
            } catch (err) {
                setError('Failed to load events.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleDelete = async (eventId) => {
        try {
            const eventDoc = doc(db, 'events', eventId);
            await deleteDoc(eventDoc);
            setEvents(events.filter(event => event.id !== eventId)); // Update the state to remove the deleted event
            alert('Event deleted successfully.');
        } catch (err) {
            console.error('Error deleting event:', err);
            alert('Failed to delete event. Please try again.');
        }
    };

    const changeOrder = async (eventId, direction) => {
        const index = events.findIndex(event => event.id === eventId);
        if (direction === 'up' && index > 0) {
            // Move up
            const newEvents = [...events];
            [newEvents[index], newEvents[index - 1]] = [newEvents[index - 1], newEvents[index]];

            setEvents(newEvents);
            await updateFirestoreOrder(newEvents);
        } else if (direction === 'down' && index < events.length - 1) {
            // Move down
            const newEvents = [...events];
            [newEvents[index], newEvents[index + 1]] = [newEvents[index + 1], newEvents[index]];

            setEvents(newEvents);
            await updateFirestoreOrder(newEvents);
        }
    };

    const updateFirestoreOrder = async (updatedEvents) => {
        // Update Firestore order for all events
        try {
            for (let i = 0; i < updatedEvents.length; i++) {
                const eventDoc = doc(db, 'events', updatedEvents[i].id);
                await updateDoc(eventDoc, { order: i });
            }
        } catch (err) {
            console.error('Error updating order in Firestore:', err);
            alert('Failed to update event order in Firestore. Please try again.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-600">{error}</div>;

    return (
        <div className="m-4">
            <div>
                <BackButton />
            </div>
            <h2 className="flex justify-center text-2xl font-bold mb-4">Upcoming Events</h2>
            {events.length > 0 ? (
                <ul className="space-y-4">
                    {events.map(event => (
                        <li key={event.id} className="border p-4 rounded-lg shadow">
                            <h3 className="text-xl font-semibold">{event.title}</h3>
                            <p><strong>Date:</strong> {new Date(event.date.seconds * 1000).toLocaleDateString()}</p>
                            <p><strong>Start Time:</strong> {event.startTime}</p>
                            <p><strong>End Time:</strong> {event.endTime}</p>
                            <p><strong>Description:</strong> {event.description}</p>
                            <p><strong>Contact Name:</strong> {event.contactName}</p>
                            <p><strong>Contact Email:</strong> {event.contactEmail}</p>
                            <p><strong>Contact Phone:</strong> {event.contactPhone}</p>
                            {event.posterUrl && (
                                <img src={event.posterUrl} alt={`${event.title} poster`} className="mt-2 w-32 h-32 object-cover" />
                            )}
                            {/* Change Order Buttons */}
                            <div className="flex space-x-2 mt-2">
                                <button 
                                    onClick={() => changeOrder(event.id, 'up')} 
                                    className="bg-blue-600 text-white px-2 py-1 rounded"
                                    disabled={events.findIndex(e => e.id === event.id) === 0} // Prevent moving above the first item
                                >
                                    Move Up
                                </button>
                                <button 
                                    onClick={() => changeOrder(event.id, 'down')} 
                                    className="bg-blue-600 text-white px-2 py-1 rounded"
                                    disabled={events.findIndex(e => e.id === event.id) === events.length - 1} // Prevent moving below the last item
                                >
                                    Move Down
                                </button>
                            </div>
                            {/* Delete Button */}
                            <button 
                                onClick={() => handleDelete(event.id)} 
                                className="mt-2 bg-red-600 text-white px-4 py-1 rounded"
                            >
                                Delete Event
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No upcoming events.</div>
            )}
        </div>
    );
};

export default UpcomingEvents;
