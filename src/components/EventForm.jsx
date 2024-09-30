import React, { useState } from "react";
import { db, storage } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const EventForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",  // Updated to startTime
    endTime: "",    // New endTime field
    description: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    poster: null,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, poster: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const { title, date, startTime, endTime, contactName, contactEmail, description, contactPhone, poster } = formData;

    if (!title || !date || !startTime || !endTime || !contactName || !contactEmail || !description || !contactPhone) {
      alert("Please fill in all required fields.");
      setIsUploading(false);
      return;
    }

    try {
      let posterUrl = "";

      if (poster) {
        const posterRef = ref(storage, `posters/${poster.name}`);
        const uploadTask = uploadBytesResumable(posterRef, poster);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                posterUrl = url;
                resolve();
              });
            }
          );
        });
      }

      await addDoc(collection(db, "requested_events"), {
        title,
        date,
        startTime,
        endTime,  // Include endTime in the document
        description,
        contactName,
        contactEmail,
        contactPhone,
        posterUrl,
        status: "pending",
      });

      // Close the form and show the success message
      setFormData({
        title: "",
        date: "",
        startTime: "",  // Reset startTime
        endTime: "",    // Reset endTime
        description: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        poster: null,
      });

      e.target.reset();
      if (onClose) onClose(); // Close the form

      // Show the success message after form is closed
      setTimeout(() => {
        alert("Event request submitted successfully.");
        if (onSubmit) onSubmit();
      }, 500); // Slight delay to ensure form closes first
    } catch (error) {
      console.error("Error adding document: ", error.message);
      setErrorMessage("Failed to submit event request. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-auto">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative overflow-auto max-h-[90vh]">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">Request an Event</h2>

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
              value={formData.title}
              onChange={handleInputChange}
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
              value={formData.date}
              onChange={handleInputChange}
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
              name="startTime"  // Updated to startTime
              value={formData.startTime}
              onChange={handleInputChange}
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
              name="endTime"    // New endTime field
              value={formData.endTime}
              onChange={handleInputChange}
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
              value={formData.description}
              onChange={handleInputChange}
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
              value={formData.contactName}
              onChange={handleInputChange}
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
              value={formData.contactEmail}
              onChange={handleInputChange}
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
              value={formData.contactPhone}
              onChange={handleInputChange}
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
      </div>
    </div>
  );
};

export default EventForm;
