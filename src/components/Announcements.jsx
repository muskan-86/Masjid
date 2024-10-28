import React, { useState } from 'react';
import Slider from "react-slick";
import { useAnnouncements } from '../context/AnnouncementContext';
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{
            ...style, display: "flex", alignItems: "center", justifyContent: "center", background: "gray",
            borderRadius: "50%", width: "20px", height: "20px", right: '2px', zIndex: 1,
            cursor: 'pointer'
        }} onClick={onClick}></div>
    );
};

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{
            ...style, display: "flex", alignItems: "center", justifyContent: "center", background: "gray",
            borderRadius: "50%", width: "20px", height: "20px", left: '2px', zIndex: 1, cursor: 'pointer'
        }} onClick={onClick}></div>
    );
};
const Announcements = () => {
    const { announcements } = useAnnouncements();
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        afterChange: (current) => setCurrentSlide(current),
        responsive: [
            {
                breakpoint: 480, // Small screens (e.g., phones)
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    horizontal: true, // Enable vertical scrolling for small screens
                },
            },
        ],
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
        <div className="">
            <div>
                <Navbar />
            </div>
            <div className=" flex items-center justify-center z-50 my-16">
                <div className="bg-white p-4 rounded-lg shadow-md w-11/12 max-w-full mx-4 relative">
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
            <div className='mt-12'>
                <Footer />
            </div>
        </div>

    );
};

export default Announcements;
