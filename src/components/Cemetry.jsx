import React, { useState } from 'react';
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const Cemetry = () => {

    return (
        <div className="font-noto-sans bg-white overflow-x-hidden">
            <div>
                <Navbar />
            </div>
            {/* Cemetry part */}
            <div>
                <div className="flex flex-col justify-around items-center gap-5 mt-8 mb-6">
                    <div
                        className="relative w-full h-40 flex justify-center mx-72 px-96"
                        style={{ backgroundImage: `url('/background.png')` }}
                    >
                        <div className="absolute inset-0 bg-white opacity-75"></div>
                        <div className="flex justify-center items-center max-w-full my-4 font-serif z-20">
                            <button className="bg-white rounded-full border-4 border-green-600 px-8 py-2 text-green-600 
                             text-xl font-noto-sans" >
                                Cemetry
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className=" flex items-center justify-center mb-6 ">
                        <div className="bg-white p-8 rounded-2xl shadow-md w-11/12 mx-4 relative">
                            <div className="text-left">
                                <p>
                                    THE Islamic Cemetery of Oregon (Corvallis Cemetery) WILL NOT ALLOW THE BODY OF ANY
                                    DECEASED TO BE BURIED WITHOUT ALL THAT IS REQUIRED BY THE LAW, SUCH AS:
                                </p>
                                <p>
                                    <strong>A.</strong>
                                    IF THE DECEASED IS FROM THE STATE OF OREGON:
                                    <br />
                                    <br />
                                    1. Death certificate filled and signed.
                                    <br />
                                    2. Metal tag (Size of a Quarter).
                                    <br />
                                    3. The number on the tag must match the number on the upper left corner of the Death Certificate.
                                    <br />
                                    4. Upon the instructions from the Oregon Mortuary & Cemetery Board Regulating Death Care Facilities
                                    and Practitioners in Oregon, This form needs to be provided to the <strong>person in charge of
                                        the remains of the deceased</strong>, before the Janaza at the Masjid, with instructions:
                                    <br /><br />
                                    a. That it be clearly filled and signed by the person <strong>in charge of the remains of the
                                        deceased</strong> and,
                                    <br />
                                    b. That the person in charge of the remains of the deceased MUST bring with the remains of the
                                    deceased when the Mayyat is brought to the relevant Cemetery for burial.
                                    <br /><br />
                                    No burial is legally permitted UNLESS the family of the deceased present this document that is
                                    clearly filled and signed by the person in charge of the remains of the deceased and the two Final
                                    Disposition Authorization forms with the metal tag.
                                    <br /><br />
                                </p>
                                <div>
                                    <a href="https://www.bilalmasjid.com/Services/Funeral/Final%20authorization%20for%20burial%205.pdf"
                                        target="_blank" className='text-blue-500 hover:underline'>
                                        Interment Authorization Form
                                    </a>
                                    <br/><br/>
                                </div>


                                <p>
                                    <strong>B.</strong> IF THE DECEASED IS FROM OUTSIDE THE STATE OF OREGON:
                                    <br/> <br/>
                                    1. Death certificate filled and signed.
                                    <br/>
                                    2. Burial-transit permit.
                                    <br/> <br/>

                                    Cemetery address: 6815 SW West Hills Rd Corvallis, OR 97333
                                    <br/> <br/>

                                    Click 
                                    <a href="http://wikimapia.org/#lang=en&lat=44.558074&lon=-123.329853&z=18&m=w"
                                        target="_blank" className='text-blue-500 hover:underline'>
                                         Here
                                    </a> for the location - Wikimapia

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

export default Cemetry;
