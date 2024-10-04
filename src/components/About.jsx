import React, { useState } from 'react';
import DonateButton from './DonateButton';
import ApplyButton from './ApplyBtn';
import ProcessButton from './ProcessBtn';
import PolicyButton from './PolicyBtn';
import Footer from "./Footer";
import Navbar from "./Navbar";
import AboutHeroSection from './AboutHeroSection';
import WhatsAppButton from "./WhatsAppButton.jsx";
import AnnouncementButton from './AnnouncementButton.jsx';
import AnnouncementPopup from './AnnouncementPopup.jsx';
import"./output.css"
const About = () => {
 
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);

  return (
    <div className="font-noto-sans overflow-x-hidden">
      <div className="flex flex-col justify-center items-center font-noto-sans text-black">
      
        <div className='w-full'>
          <Navbar />
        </div>
        <div className="relative gap-2">
        {/* Other components */}
        <AnnouncementButton onClick={() => setIsAnnouncementOpen(true)} />
        {isAnnouncementOpen && (
          <AnnouncementPopup 
            onClose={() => setIsAnnouncementOpen(false)}
          />
        )}
      
      </div>
     < WhatsAppButton/>
        {/* Hero Section */}
          <AboutHeroSection/>
        {/* Hero Section End */}
        {/* Prayer Section */}
        <div>
        <div
          className="flex flex-col min-h-80 min-w-full py-5 px-10 gap-14 bg-white"
        >
          <div >
            <div className="flex flex-col items-center justify-center gap-2 my-3">
              <p className="text-center text-lg text-mediumseagreen-300 font-bold">
                Pillars of Islam
              </p>
              <p className="text-black text-center text-3xl font-semibold m-1">
                Pillars of Islam
              </p>
            </div>
            {/* <!-- Prayer Times --> */}
            <div
              className="flex flex-wrap sm:flex-nowrap flex-row gap-12 items-center justify-around my-14"
            >
              <div
                className="flex min-w-32 p-5 min-h-36 flex-col items-center gap-4 justify-center bg-gray-200 rounded-3xl"
              >
                <img
                  className="object-contain"
                  src="/Ramadan.png"
                  alt="Sun Icon"
                  style={{ width: '40px', height: '40px' }}
                />

                <p className="text-black m-0 text-smi font-semibold">Faith</p>
              </div>
              <div
                className="flex min-w-32 p-5 min-h-36 flex-col items-center gap-4 justify-center bg-gray-200 rounded-3xl"
              >
                <img
                  className="object-contain"
                  src="/Praying Man.png"
                  alt="Sun Icon"
                  style={{ width: '40px', height: '40px' }}
                />

                <p className="text-black m-0 text-smi font-semibold">Prayer</p>
              </div>
              <div
                className="flex min-w-32 p-5 min-h-36 flex-col items-center gap-4 justify-center bg-gray-200 rounded-3xl"
              >
                <img
                  className="object-contain"
                  src="/Donate.png"
                  alt="Sun Icon"
                  style={{ width: '40px', height: '40px' }}
                />

                <p className="text-black m-0 text-smi font-semibold">Zakat</p>
              </div>
              <div
                className="flex min-w-32 p-5 min-h-36 flex-col items-center gap-4 justify-center bg-gray-200 rounded-3xl"
              >
                <img
                  className="object-contain"
                  src="/Crescent City.png"
                  alt="Sun Icon"
                  style={{ width: '40px', height: '40px' }}
                />

                <p className="text-black m-0 text-smi font-semibold">Fasting</p>
              </div>
              <div
                className="flex min-w-32 p-5 min-h-36 flex-col items-center gap-4 justify-center bg-gray-200 rounded-3xl"
              >
                <img
                  className="object-contain"
                  src="/Mosque.png"
                  alt="Sun Icon"
                  style={{ width: '40px', height: '40px' }}
                />

                <p className="text-black m-0 text-smi font-semibold">Pilgrimage</p>
              </div>
            </div>
          </div>
        </div>
      </div>


        {/* Goals Section */} 
        <div className="bg-white px-4 md:px-0">
          <div className="container mx-auto text-center">
            <div className="flex flex-col items-center justify-center gap-1 my-3">
              <p className="text-center text-lg text-mediumseagreen-300 font-bold">
                Our Goals
              </p>
              <p className="text-black text-center text-3xl font-semibold">
                Our Goals
              </p>
            </div>

            {/* <!-- Goals Section --> */}
            <div className="my-10 flex flex-col flex-wrap gap-14 md:flex-nowrap">
              {/* <!-- Fundraising for Bilal Masjid --> */}
              <div className="bg-gray-100 min-h-64 md:min-w-[700px] rounded-3xl 
              p-10 shadow-md flex flex-col gap-2 flex-wrap items-center justify-between">
                <div className="w-full">
                  <div className="flex flex-col md:items-start">
                    <h2 className="text-xl md:text-left font-bold mb-2">
                      Fundraising for Bilal Masjid
                    </h2>
                    <p
                      className="text-gray-600 md:text-left font-normal text-smi mb-4"
                    >
                      It is our honor and high privilege to welcome you to the
                      Bilal Masjid Web site.
                    </p>
                  </div>

                  {/* <!-- Progress Bar  --> */}
                  <div className="w-full bg-gray-400 rounded-full h-2.5 mb-6">
                    <div className="bg-mediumseagreen-300 h-2.5 rounded-full"
                      style={{ width: "79%" }} >
                    </div>
                  </div>
                </div>
                <div className="mt">
                  <DonateButton />
                </div>
              </div>

              {/* <!-- Fundraising for Palestine --> */}
              <div
                className="bg-gray-100 min-h-64 md:min-w-[700px] rounded-3xl p-10 shadow-md flex flex-col gap-2 flex-wrap items-center justify-between"
              >
                <div className="w-full">
                  <div className="flex flex-col md:items-start">
                    <h2 className="text-xl md:text-left font-bold mb-2">
                      Fundraising for Bilal Masjid
                    </h2>
                    <p
                      className="text-gray-600 md:text-left font-normal text-smi mb-4"
                    >
                      It is our honor and high privilege to welcome you to the
                      Bilal Masjid Web site.
                    </p>
                  </div>

                  {/* <!-- Progress Bar  --> */}
                  <div className="w-full bg-gray-400 rounded-full h-2.5 mb-6">
                    <div
                      className="bg-mediumseagreen-300 h-2.5 rounded-full"
                      style={{ width: "79%" }}
                    ></div>
                  </div>
                </div>
                <div className="mt">
                  <DonateButton />
                </div>
              </div>
            </div>
            {/* <!-- Carousel Indicator --> */}
            <div className="flex justify-center gap-2 my-8 space-x-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-3 bg-mediumseagreen-300 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
        {/* Funding Section */}
        <section className="bg-gray-100 py-12 px-4 w-full my-5">
          <div className="container mx-auto text-center">
            <h2 className="text-xl font-bold mb-6">Need Financial Aid?</h2>
            <p className="text-gray-600 mb-4">
              It is our honor and high privilege to welcome you to the Bilal Masjid Web site.
            </p>
            <p className="text-gray-600 mb-4">Contact: +1 123 456 789</p>
            <p className="text-gray-600 mb-8">Email: bilalmasjid@example.com</p>
            <div className="flex justify-center space-x-4">
              <div className=''>
                <ProcessButton />

              </div>
              <ApplyButton />
            </div>
          </div>
        </section>

        {/* Privacy Policy */}
        <section className='flex justify-center'>
          <div className="bg-gray-100 shadow-sm py-8 m-10 inline-block border-gray-300 border-2 rounded-3xl px-7">
            <div className="container mx-auto text-center">
              <h2 className="text-xl font-bold mb-4">See our Privacy Policy and Code of Conduct</h2>
              <p className="text-gray-600 mb-6">
                It is our honor and high privilege to welcome you to the Bilal Masjid Web site.
              </p>
              <div className='flex items-center justify-center'>
                <PolicyButton />
              </div>
            </div>
          </div>
        </section>
      </div>
       {/* footer */}
       <div>
        <Footer />
        </div>
    </div>
  );
};

export default About;
