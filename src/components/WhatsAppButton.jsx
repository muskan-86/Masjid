import React from 'react';

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-mediumseagreen-300 rounded-full w-8 h-8">
        <a href="https://chat.whatsapp.com/B8c6ngDZTkBI8RBs6JHEgm" target="_blank" rel="noopener noreferrer">
          <img src="/whatsapp-icon.svg" className='p-1' alt="whatsapp icon" />
        </a>
      </div>
    </div>
  );
};

export default WhatsAppButton;
