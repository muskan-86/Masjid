import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { 
    collection, getDocs, addDoc, deleteDoc, doc, updateDoc 
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import BackButton from './BackButton';
import { useAnnouncements } from '../context/AnnouncementContext';

const AnnouncementUpdate = () => {
    const { announcements, setAnnouncements } = useAnnouncements();
    const [newAnnouncement, setNewAnnouncement] = useState({ title: '', imageUrl: '' });
    const [imageFile, setImageFile] = useState(null);

    // Fetch announcements from Firestore
    const fetchAnnouncements = async () => {
        const querySnapshot = await getDocs(collection(db, 'announcements'));
        const fetchedAnnouncements = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setAnnouncements(fetchedAnnouncements);
    };

    useEffect(() => {
        fetchAnnouncements();
    }, [setAnnouncements]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    const uploadImage = async () => {
        if (!imageFile) return;

        const storage = getStorage();
        const storageRef = ref(storage, `announcements/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        const url = await getDownloadURL(storageRef);
        return url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const imageUrl = await uploadImage();
        if (newAnnouncement.title && imageUrl) {
            const announcement = { title: newAnnouncement.title, imageUrl };
            const docRef = await addDoc(collection(db, 'announcements'), announcement);

            const newAnnounceWithId = { id: docRef.id, ...announcement };
            setAnnouncements((prevAnnouncements) => [...prevAnnouncements, newAnnounceWithId]);

            setNewAnnouncement({ title: '', imageUrl: '' });
            setImageFile(null);
        } else {
            alert('Please provide both a title and an image.');
        }
    };

    const handleDeleteAnnouncement = async (id) => {
        await deleteDoc(doc(db, 'announcements', id));
        const updatedAnnouncements = announcements.filter((announcement) => announcement.id !== id);
        setAnnouncements(updatedAnnouncements);
    };

    // Change order logic: move up or down
    const changeOrder = async (announcementId, direction) => {
        const index = announcements.findIndex((a) => a.id === announcementId);
        if (direction === 'up' && index > 0) {
            const newAnnouncements = [...announcements];
            [newAnnouncements[index], newAnnouncements[index - 1]] = [
                newAnnouncements[index - 1],
                newAnnouncements[index],
            ];

            setAnnouncements(newAnnouncements);
            await updateFirestoreOrder(newAnnouncements);
        } else if (direction === 'down' && index < announcements.length - 1) {
            const newAnnouncements = [...announcements];
            [newAnnouncements[index], newAnnouncements[index + 1]] = [
                newAnnouncements[index + 1],
                newAnnouncements[index],
            ];

            setAnnouncements(newAnnouncements);
            await updateFirestoreOrder(newAnnouncements);
        }
    };

    const updateFirestoreOrder = async (updatedAnnouncements) => {
        try {
            for (let i = 0; i < updatedAnnouncements.length; i++) {
                const announcementDoc = doc(db, 'announcements', updatedAnnouncements[i].id);
                await updateDoc(announcementDoc, { order: i });
            }
        } catch (err) {
            console.error('Error updating order in Firestore:', err);
            alert('Failed to update announcement order. Please try again.');
        }
    };

    return (
        <div className='mt-4'>
            <BackButton />
            <div className="p-6 min-h-screen flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-6">Manage Announcements</h1>
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md w-full max-w-md mb-6">
                    <input
                        type="text"
                        placeholder="Announcement Title"
                        value={newAnnouncement.title}
                        onChange={(e) =>
                            setNewAnnouncement({ ...newAnnouncement, title: e.target.value })
                        }
                        className="w-full p-2 mb-2 border rounded"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full mb-2 border rounded"
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    >
                        Add Announcement
                    </button>
                </form>

                <div className="w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-4">Current Announcements</h2>
                    {announcements.length > 0 ? (
                        announcements.map((announcement, index) => (
                            <div
                                key={announcement.id}
                                className="bg-white p-4 mb-2 rounded shadow-md flex items-center justify-between"
                            >
                                <div>
                                    <p className="font-bold">{announcement.title}</p>
                                    <img
                                        src={announcement.imageUrl}
                                        alt={announcement.title}
                                        className="h-16 w-16 object-cover mt-2"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => changeOrder(announcement.id, 'up')}
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                    >
                                        Up
                                    </button>
                                    <button
                                        onClick={() => changeOrder(announcement.id, 'down')}
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                    >
                                        Down
                                    </button>
                                    <button
                                        onClick={() => handleDeleteAnnouncement(announcement.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No announcements available. Please add one.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnnouncementUpdate;
