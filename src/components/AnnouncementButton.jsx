// AnnouncementButton.jsx
import React, { useState } from 'react';
import AnnouncementPopup from './AnnouncementPopup';

const AnnouncementButton = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
      console.log("Close button clicked");
      setIsPopupOpen(false);
  };
  
    return (
        <div>
            <button
                onClick={handleOpenPopup}
                className="fixed bottom-4 right-12 bg-white text-mediumseagreen-300 rounded-full z-50 border-2 border-green-600 h-8 w-36"
            >
                Announcement
            </button>
            <AnnouncementPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
        </div>
    );
};

export default AnnouncementButton;
