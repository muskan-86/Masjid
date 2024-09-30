// AnnouncementButton.jsx
import React from 'react';

const AnnouncementButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-12 bg-white text-mediumseagreen-300  rounded-full z-50 border-2 border-green-600 h-8 w-36 "
    >
        Announcement
    </button>
  );
};

export default AnnouncementButton;
