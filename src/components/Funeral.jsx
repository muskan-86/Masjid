import React, { useState } from 'react';
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx"


const Funeral = () => {

    return (
        <div className="font-noto-sans bg-white overflow-x-hidden">
            <div>
                <Navbar />
            </div>
            {/* Funeral part */}
            <div>
                <div className="flex flex-col justify-around items-center gap-5 mt-8 mb-6">
                    <div
                        className="relative w-full h-40 flex justify-center mx-72 px-96"
                        style={{ backgroundImage: `url('/background.png')` }}>
                        <div className="absolute inset-0 bg-white opacity-75"></div>
                        <div className="flex justify-center items-center max-w-full my-4 font-serif z-20">
                            <button className="bg-white rounded-full border-4 border-green-600 px-8 py-2 text-green-600 
                             text-lg font-noto-sans" >
                                Funeral
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className=" flex items-center justify-center mb-6 ">
                        <div className="bg-white p-8 rounded-3xl shadow-md w-11/12 mx-4 relative">
                            <div className="text-left">
                                <h3 className="text-xl font-bold text-black">Upon Death <br/></h3>
                                <p>
                                    We know that this is a difficult time. May Allah give you and your family patience and your
                                    loved ones forgiveness and Jannah, Insha Allah!
                                    <br/><br/>
                                    There are multiple places to go for burial. We will focus on the ones closer to Bilal masjid
                                    but still ist others. But please do read the Basic Process if you can:
                                    <br/><br/>
                                    The best way is to contact PDX Cemterty at 503-473-0563 and they will take care of all arranegemnts.
                                    <br/><br/>
                                    <strong>Basic process:</strong>
                                    <br/>
                                    1. We will call the cemetery ahead of time and give them a time of arrival
                                    <br/>
                                    2. The Mayyat is transported to the Funeral Home and it is kept there until Ghusal.
                                    <br/>
                                    3. Ghusal is performed at the Funeral Home as close to the Janaza prayer as possible.
                                    <br/>
                                    4. Janaza prayer is perfomed at Masjid of your choosing.
                                    <br/>
                                    5. We drive over to the Cemetery in Funeral Home transportation but in some cases, parents have
                                     elected to carry their deceased child with then in their cars.
                                     <br/>
                                    6. PLEASE arrange for a minimum of $20 as a gift for the digger.
                                    <br/>
                                    <strong>Janaza:</strong>
                                    <br/>
                                    Please contact PDX Cemetery for Janaza at Bilal Masjid in Beaverton.
                                    <br/>
                                    Their phone number is 503-473-0563
                                    <br/>
                                    Website: https://pdxcemetery.org/
                                    <br/><br/>

                                    Please contact Masjid As-Sabr for Janaza in Tigard OR.
                                    <br/>
                                    Their phone number is 503-246-9160
                                    <br/><br/>

                                    Please contact Corvallis Masjid for Janaza in Corvallis OR.
                                    <br/>
                                    Imam Siala from Corvallis Masjid: 541-758.9116
                                    <br/><br/>
                                    <strong>Funeral Home:</strong> PDX Cemtery Will take care of all Arranegments. But shuold you need to contact the
                                     funeral home, here is their information:
                                     <br/>
                                    Springer & Son: 503-356-1000
                                    <br/>
                                    Address: 4150 SW 185th Ave, Beaverton, OR 97007
                                    <br/><br/>


                                   <strong> Islamic Cemetery of Oregon (In Corvallis) Instructions:</strong>
                                    <br/>
                                    Please call the Islamic Cemetery of Oregon at 541.757.1970'
                                    <br/>
                                    You can call up the following number also:
                                    <br/>
                                    Phone: (541) 758-0329
                                    <br/>
                                    Address: 6815 SW West Hills Rd Corvallis, OR 97333
                                    <br/><br/>

                                    One thing, to dig the grave, you will need enough man-power. If you think you will get backhoe, please make sure that you get the permission from ICO. To rent the backhoe, please contact the following:
                                    <br/><br/>
                                    <strong>United Rentals</strong>
                                    <br/>
                                    931 Reiman St
                                    <br/>
                                    Corvallis, OR 97330
                                    <br/>
                                    Ph- 541.754.1231
                                    <br/><br/>

                                    <strong>Direction to ICO from Portland:</strong>
                                    <br/>
                                    Take I-5S
                                    <br/>
                                    Take Corvallis/HWY 34 Exit
                                    <br/>
                                    On the exit, take a right
                                    <br/>
                                    Stay on this road â€“ it will become Harrison
                                    <br/>
                                    Stay on Harrison
                                    <br/>
                                    Take a left on Walnut/53rd Street
                                    <br/>
                                    Take a right on SW West Hills Road
                                    <br/>
                                    <strong>Better Direction:</strong>
                                    <br/>
                                    <div>
                                        <a href="http://hammer.prohosting.com/~sfico/cm.html" target="_blank" className='sm:text-sm overflow-x-hidden text-sm text-blue-500 hover:underline'>
                                    http://hammer.prohosting.com/~sfico/cm.html</a>
                                    </div>
                                    <br/><br/><br/>

                                    
                                    <strong>Direction from United Rental to Graveyard:</strong>
                                    <br/>
                                    Come out of the store and take a left on the road
                                    <br/>
                                    Take A right on Harrison
                                    <br/>
                                    Take a left on Walnut/53rd Street
                                    <br/>
                                    Take a right on SW West Hills Road
                                    <br/>
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

export default Funeral;
