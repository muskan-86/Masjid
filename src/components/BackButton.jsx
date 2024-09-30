import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/admin-panel')} // Navigate to the admin panel page
      className="flex items-center space-x-2 p-2 bg-green-300 hover:bg-gray-300 rounded-full"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};
export default BackButton;
