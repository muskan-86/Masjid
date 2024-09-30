import React from "react";
import ContactButton from './ContactButton';

const AboutHeroSection = () => {
    return (
    <>
     <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col mx-auto text-center py-5 m-5 px-2">
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
          <div className="flex justify-between items-center space-x-2">
            <div className="w-6 h-6 bg-mediumseagreen-300 rounded-full"></div>
            <div className="w-6 h-6 bg-mediumseagreen-300 rounded-full"></div>
            <div className="w-6 h-6 bg-mediumseagreen-300 rounded-full"></div>
            <div className="w-6 h-6 bg-mediumseagreen-300 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white py-6 px-10 w-full">
          <div 
            className="flex lg:flex-row md:flex-row sm:flex-col  gap-5 md:gap-3 md:justify-between items-center"
          >
            <div className="max-w-[650px]">
              <p className="text-mediumseagreen-300 font-semibold">About Us</p>
              <h2 className="text-2xl font-bold my-3">About Bilal Masjid</h2>
              <p className="text-gray-600">
                It is our honor and high privilege to welcome you to the Bilal
                Masjid Web site. It is through the Gracious Mercy of Allah (SWT)
                that we are able to provide these services. It is our honor and
                high privilege to welcome you to the Bilal Masjid Web site. It
                is through the Gracious Mercy of Allah (SWT) that we are able to
                provide these services.
              </p>
              <ContactButton/>
            </div>
            <div className="w-50 md:w-1/2 flex justify-center">
              <div
                className="bg-mediumseagreen-300 rounded-3xl m-7 h-64 w-50 md:w-96 flex items-center justify-center"
              >
                <button className="text-white text-4xl ">&#9654;</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
 );
};
export default AboutHeroSection;