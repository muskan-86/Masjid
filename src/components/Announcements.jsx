import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Announcements = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Adjust speed (in milliseconds)
    arrows: true, // Show arrows
    prevArrow: (
        <button className="absolute flex justify-center left-4 top-1/2 transform -translate-y-1/2 z-50">
          <img src="https://i.pinimg.com/736x/4d/e9/3f/4de93f19fad110b31d31846fced05cb9.jpg" alt="Previous" className="w-8 h-8" /> {/* Add your left arrow image */}
        </button>
      ),
      nextArrow: (
        <button className="  z-50">
          <img src="https://icons.veryicon.com/png/o/miscellaneous/8atour/arrow-right-50.png" alt="Next" className="w-8 h-8" /> {/* Add your right arrow image */}
        </button>
      ),
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl relative">
        <h2 className="text-center text-3xl font-bold mb-6">Announcements</h2>
        <Slider {...settings}>
          <div className="card w-70 rounded-lg">
            <div className="relative flex flex-col items-center justify-center w-full h-full">
              <img className="h-72 rounded-2xl w-80 object-cover" src="/Why-Islam-is-true-1536x1536.jpg" alt="Event 1" />
            </div>
          </div>

          <div className="card w-70 rounded-lg">
            <div className="relative flex flex-col items-center justify-center w-full h-full">
              <img className="h-72 rounded-2xl w-72 object-cover" src="/Discussion-Navigating-Relationships.jpg" alt="Event 2" />
            </div>
          </div>

          <div className="card w-70 rounded-lg">
            <div className="relative flex flex-col items-center justify-center w-full h-full">
              <img className="h-72 rounded-2xl w-72 object-cover" src="/traditional-iftar-fast-breaking.jpg" alt="Event 3" />
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Announcements;
