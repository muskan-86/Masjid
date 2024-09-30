import React, { useState } from 'react';
import Slider from "react-slick";
import { useAnnouncements } from '../context/AnnouncementContext';



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
const AnnouncementPopup = ({ onClose }) => {
    const { announcements } = useAnnouncements();
    const [currentSlide, setCurrentSlide] = useState(0);

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
    const getDotColor = (index) => {
        switch (index) {
            case 0:
                return "#10B981"; // Tailwind color for first image
            case 1:
                return "#10B981"; // Tailwind color for second image
            case 2:
                return "#10B981"; // Tailwind color for third image
            default:
                return "gray";
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm relative mx-4">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 text-3xl">&times;</button>
                <Slider {...settings}>
                    {announcements.length > 0 ? (
                        announcements.map((announcement) => (
                            <div key={announcement.id} className='w-70 rounded-lg'>
                                <div className="relative flex flex-col items-center justify-center">
                                    <img className="h-72 rounded-2xl max-w-md object-cover mb-4" src={announcement.imageUrl} alt={announcement.title} />
                                    {/* <p className="font-bold">{announcement.title}</p> */}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center">No announcements available.</div>
                    )}
                </Slider>
            </div>
        </div>
    );
};

export default AnnouncementPopup;
