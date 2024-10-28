// AnnouncementPopup.jsx
import { useState } from 'react';
import React from 'react';
import { useAnnouncements } from '../context/AnnouncementContext';
import Slider from "react-slick";

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style, display: "flex", alignItems: "center", justifyContent: "center", background: "gray", 
            borderRadius: "50%", width: "20px", height: "20px", right: '2px', zIndex: 1,
             cursor: 'pointer' }} onClick={onClick}></div>
    );
};

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style, display: "flex", alignItems: "center", justifyContent: "center", background: "gray",
             borderRadius: "50%", width: "20px", height: "20px", left: '2px', zIndex: 1, cursor: 'pointer' }} onClick={onClick}></div>
    );
};
const AnnouncementPopup = ({ isOpen, onClose }) => {
    const { announcements } = useAnnouncements();
    const [currentSlide, setCurrentSlide] = useState(0);
    if (!isOpen) return null; // Don't render if not open
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        afterChange: (current) => setCurrentSlide(current),
        customPaging: (i) => (
            <div
                style={{
                    width: "12px",
                    height: "12px",
                    background: i === currentSlide ? getDotColor(i) : "gray", 
                    borderRadius: "50%",
                    transition: 'background-color 0.3s ease',
                    
                }}
            />
        ),
    };

    // Function to determine the dot color based on the slide index
    const getDotColor = (i) => {
        return "#10B981"; // Tailwind color for active dots
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-4 rounded-lg shadow-md w-11/12 max-w-sm mx-4 relative">
        {/* Close Button */}
        <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 text-3xl leading-none focus:outline-none hover:text-gray-800 z-50"
            style={{ cursor: 'pointer', padding: 0, margin: 0 }}
        >
            &times;
        </button>

        {/* Slider Component */}
        <Slider {...settings}>
            {announcements.length > 0 ? (
                announcements.map((announcement) => (
                    <div key={announcement.id} className="w-70 rounded-lg">
                        <div className="relative flex flex-col items-center justify-center">
                            <img
                                src={announcement.imageUrl}
                                alt={announcement.title}
                                className="h-72 rounded-2xl max-w-md object-cover mb-4"
                            />
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No announcements available.</p>
            )}
        </Slider>
    </div>
</div>

    );
};

export default AnnouncementPopup;
