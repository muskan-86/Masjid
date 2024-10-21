import React, { useState } from 'react';
import { db, storage } from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import BackButton from './BackButton';

const UpcomingEventUpload = () => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [poster, setPoster] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleUpload = async (e) => {
        e.preventDefault();
        setIsUploading(true);

        try {
            // Logic to upload the poster to Firebase Storage and get the URL
            const posterUrl = poster ? await uploadPoster(poster) : '';

            // Add event details to Firestore
            await addDoc(collection(db, 'events'), {
                title,
                date: new Date(date),
                startTime,
                endTime,
                description,
                contactName,
                contactEmail,
                contactPhone,
                posterUrl,
               
            });

            // Clear form after upload
            setTitle('');
            setDate('');
            setStartTime('');
            setEndTime('');
            setDescription('');
            setContactName('');
            setContactEmail('');
            setContactPhone('');
            setPoster(null);
           

            e.target.reset();
            alert("Event request submitted successfully.");
        } catch (error) {
            console.error('Error uploading event:', error);
            setErrorMessage('There was an issue submitting the event. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const uploadPoster = async (file) => {
        const storageRef = ref(storage, `posters/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return url;
    };

    const handleFileChange = (e) => {
        setPoster(e.target.files[0]);
    };

    return (
        <form className="space-y-4 m-2" onSubmit={handleUpload}>
            <div className="mt-4">
                <BackButton/>
            </div>
            <h2 className="flex justify-center text-2xl font-bold mb-4">Add an Upcoming Event</h2>

            {errorMessage && (
                <div className="text-red-600 font-semibold text-center mb-4">
                    {errorMessage}
                </div>
            )}

            {/* Event Title Input */}
            <div className="mb-4">
                <label className="block text-gray-700">
                    Event Title <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    required
                />
            </div>

            {/* Date Input */}
            <div className="mb-4">
                <label className="block text-gray-700">
                    Date <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    required
                />
            </div>

            {/* Start Time Input */}
            <div className="mb-4">
                <label className="block text-gray-700">
                    Start Time <span className="text-red-500">*</span>
                </label>
                <input
                    type="time"
                    name="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    required
                />
            </div>

            {/* End Time Input */}
            <div className="mb-4">
                <label className="block text-gray-700">
                    End Time <span className="text-red-500">*</span>
                </label>
                <input
                    type="time"
                    name="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    required
                />
            </div>

            {/* Description Input */}
            <div className="mb-4">
                <label className="block text-gray-700">
                    Description <span className="text-red-500">*</span>
                </label>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    required
                />
            </div>

            {/* Contact Name Input */}
            <div className="mb-4">
                <label className="block text-gray-700">
                    Contact Person Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="contactName"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    required
                />
            </div>

            {/* Contact Email Input */}
            <div className="mb-4">
                <label className="block text-gray-700">
                    Contact Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    name="contactEmail"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    required
                />
            </div>

            {/* Contact Phone Input */}
            <div className="mb-4">
                <label className="block text-gray-700">
                    Contact Phone <span className="text-red-500">*</span>
                </label>
                <input
                    type="tel"
                    name="contactPhone"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    required
                />
            </div>

            {/* Event Poster Input */}
            <div className="mb-4">
                <label className="block text-gray-700">Event Poster (optional)</label>
                <input
                    type="file"
                    name="poster"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border rounded"
                />
            </div>



            {/* Submit Button */}
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full" disabled={isUploading}>
                {isUploading ? "Submitting..." : "Submit Request"}
            </button>
        </form>
    );
};

export default UpcomingEventUpload;
