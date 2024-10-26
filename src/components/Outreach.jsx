import React, { useState } from 'react';
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";


const AboutUs = () => {

    return (
        <div className="font-noto-sans bg-white overflow-x-hidden">
            <div>
                <Navbar />
            </div>
            {/* Outreach part */}
            <div>
                <div className="flex flex-col justify-around items-center gap-5 mt-8 mb-5">
                    <div
                        className="relative w-full h-40 flex justify-center mx-72 px-96"
                        style={{ backgroundImage: `url('/background.png')` }}
                    >
                        <div className="absolute inset-0 bg-white opacity-75"></div>
                        <div className="flex justify-center items-center max-w-full my-12 font-serif z-20">
                            <button className="bg-white rounded-full border-4 border-green-600 px-8 py-2 text-green-600 font-medium text-2xl font-sans" >
                                Outreach
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className=" flex items-center justify-center mb-6 ">
                        <div className="bg-white p-4 rounded-xl shadow-md w-11/12 mx-4 relative">
                            <div className="text-left">
                                <h2 className="font-bold text-xl">Bilal Masjid Outreach/Interfaith</h2>
                                <br/>
                                <p>
                                    * Bilal Masjid maintains strong ties with other religious groups, and regularly hosts dialogs with Jewish,
                                     Christian, and other faith traditions.
                                     <br/><br/>

                                    * Participates heavily in interfaith and community service programs and social events.
                                     <br/><br/>
                                    * Maintains an excellent relationship with various state and local law enforcement agencies.
                                     <br/><br/>
                                    * Bilal Masjid Association, along with other Muslim organizations throughout North America, strongly condemn
                                     and reject the actions of terrorists and terrorism.
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         {/* Footer */}
         <div>
                <Footer />
        </div>
        </div>
    );
};

export default AboutUs;
