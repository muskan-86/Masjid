import React, { useState } from 'react';
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";


const SocialServices = () => {

    return (
        <div className="font-noto-sans bg-white overflow-x-hidden">
            <div>
                <Navbar />
            </div>
            {/* Social Services part */}
            <div>
                <div className="flex flex-col justify-around items-center gap-5 mt-8 mb-5">
                    <div
                        className="relative w-full h-40 flex justify-center mx-72 px-96"
                        style={{ backgroundImage: `url('/background.png')` }}
                    >
                        <div className="absolute inset-0 bg-white opacity-75"></div>
                        <div className="flex justify-center items-center max-w-full my-12 font-serif z-20">
                            <button className="bg-white rounded-full border-4 border-green-600 px-8 py-2 text-green-600 font-medium text-2xl font-sans" >
                               Social Services
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className=" flex items-center justify-center mb-6  ">
                        <div className="bg-white p-8 rounded-xl shadow-md w-11/12 mx-4 relative">
                            <div className="text-left">
                                    <div>
                                    <a href="https://virginiagarcia.org/" target="_blank" className='text-sm
                                     text-blue-500 hover:underline'>
                                    Virginia Garcia Memorial Health Center</a>
                                    </div>
                                    <br/>
                                    <div>
                                    <a href="https://i-sos.org/" target="_blank" className='text-sm
                                     text-blue-500 hover:underline'>
                                    Islamic Social Services of Oregon State (I-SOS)</a>
                                    </div>
                                    <br/>
                                    <div>
                                    <a href="https://bilalmasjid.com/Services/Forms/Bilal_Financial_Aid_Form.pdf" target="_blank" 
                                    className='text-sm text-blue-500 hover:underline'>
                                    Bilal Financial Aid Form </a>
                                    (Please email completed form to 
                                    <a className='text-sm text-blue-500 hover:underline'> zakat@bilalmasjid.com </a>
                                     or provide it to Br. Adil, Br. Arshad or Sr. Faiza)
                                    </div>
                                <br/>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/* Footer */}
        <div>
            <Footer/>
        </div>

        </div>

    );
};

export default SocialServices;
