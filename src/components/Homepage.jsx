import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Event from './Event.jsx';
import IndexDonateBtn from './IndexDonateBtn.jsx'
import IndexJoinUs from "./IndexJoinUsBtn.jsx";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";
import Loader from "./Loader.jsx"
import WhatsAppButton from "./WhatsAppButton.jsx";
import AnnouncementButton from './AnnouncementButton.jsx';
import AnnouncementPopup from './AnnouncementPopup.jsx';
import "./home.css";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; 
import PrayerTimes from './PrayerTimes.jsx';
 
const HomePage = () => {
  const [loading, setLoading] = useState(true); // State to track loader status
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);

  useEffect(() => {
    // Simulate loader completion after a delay (e.g., 3 seconds)
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false once done
    }, 3000);

    AOS.init({
      duration: 2000,
      delay: 3000,
    });

    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="overflow-hidden bg-white">
        {loading && <Loader />} {/* Show loader if loading is true */}
        <div className="relative z-40" data-aos="fade-down">
          <Navbar />
        </div>

        <div className="relative gap-4">
          {/* Other components */}
          {!loading && <AnnouncementButton/>}
        </div>

        {!loading && <WhatsAppButton />}

        {/* hero Section*/}
        <div className="mt-2 font-noto-sans">
          {/* Displayed on large screens */}
          <div className="hidden-on-mobile bg-cover bg-center p-10 bg-white lg:flex lg:flex-row py-12 items-center">
            <div className="relative z-20 flex flex-row justify-start mt-22 max-w-full mx-10 gap-20">
              {/* Left Section: Welcome Message */}
              <div className="flex flex-col w-1/3 gap-4 items-start mt-10 justify-center text-left p-2">
                <div className="my-4 w-full">
                  <h2 className="font-black text-3xl text-left" data-aos="fade-down">
                    Welcome to Bilal Masjid
                  </h2>
                </div>
                <div className="w-full text-left text-justify" data-aos="slide-right">
                  It is our honor and high privilege to welcome you to the Bilal Masjid Web site.
                  It is through the Gracious Mercy of Allah (SWT) that we are able to provide these services.
                </div>

                <div className="flex justify-start ml-2 items-center gap-4 w-full">
                  <IndexJoinUs />
                  <IndexDonateBtn />
                </div>
              </div>

              {/* Middle Section: Image and Address Button */}
              <div className=" relative w-[30]  flex justify-center m-auto z-20" data-aos="zoom-in" data-aos-duration="1500ms" data-aos-delay="3000ms">
                <img className="h-[500px] w-[350px]" src="/mask-group@2x.png" alt="Middle Section Image" />

                <div className="absolute ml-2 bottom-[10px] left-50 transform -translate-x-1/2 bg-white rounded-lg border-2 border-green-600 px-6 py-2 flex items-center shadow-lg">
                  <i className="fas fa-map-marker-alt text-green-600"></i>
                  <span className="ml-2 text-green-600 font-bold">
                    4115 SW 160th<br />Beaverton, OR 97008
                  </span>
                </div>
              </div>

              {/* Right Section: Prayer Times */}
              <div data-aos="zoom-in">
                <PrayerTimes />
               
              </div>
            </div>
          </div>

          {/* Displayed on small/medium screens */}
          <div className="hidden-on-desktop lg:hidden flex flex-col items-center bg-cover bg-center p-4 bg-white">
            <div className="relative z-20 flex flex-col justify-start max-w-full ">
              {/* Left Section: Welcome Message */}
              <div className="flex flex-col gap-4 items-start justify-center text-left max-w-full p-2 mx-10">
                <div className="my-4 w-full">
                  <h2 className="font-black text-xl text-left" data-aos="fade-down">
                    Welcome to Bilal Masjid
                  </h2>
                </div>
                <div className="w-full text-left text-justify" data-aos="slide-right">
                  It is our honor and high privilege to welcome you to the Bilal Masjid Web site.
                  It is through the Gracious Mercy of Allah (SWT) that we are able to provide these services.
                </div>

                <div className="flex justify-start items-center gap-4 w-full">
                  <IndexJoinUs />
                  <IndexDonateBtn />
                </div>
              </div>

              {/* Middle Section: Image and Address Button */}
              <div className="relative w-[40] flex justify-center z-20 mx-10" data-aos="zoom-in" data-aos-duration="1500ms" data-aos-delay="3000ms">
                <img className="h-[450px] w-[350px]" src="/mask-group@2x.png" alt="Middle Section Image" />
                <div className='absolute  bottom-[10px] left-50 transform -translate-x-1/2 ml-6'>
                  <div className="  bg-white rounded-lg border-2 border-green-600 px-2 py-2 flex items-center shadow-lg">
                    <i className="fas fa-map-marker-alt text-green-600"></i>
                    <span className="ml-2 text-green-600 font-bold">
                      4115 SW 160th<br />Beaverton, OR 97008
                    </span>
                  </div>
                </div>

              </div>

              {/* Right Section: Prayer Times */}
              <div data-aos="zoom-in" className=" mt-6">
                <PrayerTimes />
              </div>
            </div>
          </div>
        </div>
        {/* Hero Section ends here */}
        {/* Upcoming Events Button */}
        <div className="flex flex-col justify-center items-center max-w-full gap-5 mt-2 z-40">
          <div
            className=" relative w-screen h-60 flex justify-center"
            style={{ backgroundImage: `url('/background.png')` }}
          >
            <div className="absolute inset-0 bg-white opacity-75"></div> {/* Background Overlay */}
            <div className="flex justify-center items-center max-w-full my-9 font-serif z-20">
              <button
                className="bg-white rounded-full border-4 border-green-600 px-6 py-2 text-green-600 font-medium text-2xl font-sans"
                data-aos="fade-in" data-aos-duration="1500" data-aos-delay="500"
              >
                Upcoming Events
              </button>
            </div>
          </div>
          <div className="mt-4">
            <Event />
          </div>

          {/* Services */}
          <div className="flex flex-col justify-around items-center gap-5 mt-8 mb-5">
            <div
              className="relative w-full h-60 flex justify-center mx-72 px-96"
              style={{ backgroundImage: `url('/background.png')` }}
            >
              <div className="absolute inset-0 bg-white opacity-75"></div> 
              <div className="flex justify-center items-center max-w-full my-12 font-serif z-20">
                <button
                  className="bg-white rounded-full border-4 border-green-600 px-8 py-2 text-green-600 font-medium text-2xl font-sans"
                  data-aos="fade-in" data-aos-duration="1500" data-aos-delay="500"
                >
                  Our Services
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-hidden">
            {/* Services List */}
            <div
              className="flex flex-row flex-wrap justify-around items-center"
              data-aos="slide-left" data-aos-duration="1500"
              data-aos-delay="500"
            >
              {/* Service 1 */}
              <div className="flex flex-col  gap-12 justify-center items-center p-10">
                <div className="min-h-40 bg-mediumseagreen-300 rounded-full flex flex-col min-w-40 justify-center items-center ">
                  <img
                    className="w-20 h-20 text-center"
                    src="/graduation-cap@2x.png"
                    alt="Education Icon"
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h3 className="font-bold text-2xl">Education</h3>
                  <p className="text-center mt-2 w-full max-w-xs">
                    We provide Islamic education to the community. We have a
                    dedicated team of teachers who teach Quran, Hadith, and
                    other Islamic subjects.
                  </p>
                </div>
              </div>

              {/* Service 2 */}
              <div className="flex flex-col gap-12 justify-center items-center p-10">
                <div className="min-h-40 bg-green-600 rounded-full flex flex-col min-w-40 bg-mediumseagreen-300 justify-center items-center">
                  <img
                    className="w-20 h-20 text-center"
                    src="/users@2x.png"
                    alt="Community Icon"
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h3 className="font-bold text-2xl">Community</h3>
                  <p className="text-center mt-2 w-full max-w-xs">
                    We provide support and services to strengthen the community.
                    Our activities include social events, support groups, and
                    outreach.
                  </p>
                </div>
              </div>

              {/* Service 3 */}
              <div className="flex flex-col gap-12 justify-center items-center p-10">
                <div className="min-h-40 bg-green-600 flex flex-col min-w-40 bg-mediumseagreen-300 justify-center items-center rounded-full">
                  <img
                    className="w-20 h-20 text-center"
                    src="/today@2x.png"
                    alt="Religious Events Icon"
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h3 className="font-bold text-2xl">Religious Events</h3>
                  <p className="text-center mt-2 w-full max-w-xs">
                    We organize various religious events, including prayers,
                    lectures, and community gatherings to promote spiritual
                    growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* // Newsletter */}

        <div
          className="relative w-full m-0 py-16"
          style={{ backgroundImage: `url('/background.png')` }}
        >
          <div className="absolute inset-0 bg-white opacity-75 "></div>
          {/* <div className="absolute bg-center opacity-30"></div> */}
          <div
            className="relative bg-white z-10 flex flex-col shadow-md md:flex-row mx-auto max-w-2xl py-20 px-6 md:p-16  rounded-3xl my-8 items-center justify-center md:items-start"
            data-aos="fade-in" data-aos-duration="1500"
            data-aos-delay="500"
          >
            <div className="w-full">
              <div className="flex flex-col items-center justify-center md:items-start gap-2">
                <h2 className="font-bold text-center md:text-left text-2xl">
                  Subscribe to our Newsletter
                </h2>
                <p className="text-gray-700 text-center">
                  Be the first one to hear about our events and announcements
                </p>
              </div>
              <div className="flex items-center gap-2 mt-10">
                <input
                  className="rounded-3xl bg-slate-300 w-full md:w-60 py-2 px-4 text-black placeholder-gray-500"
                  type="email"
                  placeholder="Enter your email"
                />
                <button className="rounded-3xl bg-green-600 text-white px-4 py-2">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomePage;