import React from 'react';
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const AboutUs = () => {

    return (
        <div className="font-noto-sans bg-white overflow-x-hidden">
            <div>
                <Navbar />
            </div>
            {/* about part */}
            <div>
                <div className="flex flex-col justify-around items-center gap-5 mt-8 mb-6">
                    <div
                        className="relative w-full h-40 flex justify-center mx-72 px-96"
                        style={{ backgroundImage: `url('/background.png')` }}
                    >
                        <div className="absolute inset-0 bg-white opacity-75"></div>
                        <div className="flex justify-center items-center max-w-full my-4 font-serif z-20">
                            <button className="bg-white rounded-full border-4 border-green-600 px-8 py-2 text-green-600 
                             text-lg font-noto-sans" >
                                About Us
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className=" flex items-center justify-center  ">
                        <div className="bg-white p-4 rounded-2xl shadow-md w-11/12 mx-4 relative">
                            <div className="text-left">
                                <p>It is our honor and high privilege to welcome you to the Bilal Masjid Web site.
                                    It through the Gracious Mercy of Allah (SWT) that we are able to provide the few humble
                                    services for the community.Pray that Allah (SWT) guides us ALL in his Mercy and forgives
                                    us our transgressions.
                                </p>
                                <p className='font-bold text-black text-xl'> Mission</p>


                                <p>
                                    1) Establishing congregational prayers and carry out other religious activities that are open fully to men, women and children.
                                    <br />
                                    2) Practicing principles of moderation, tolerance, inclusiveness and conflict avoidance within the structural limits of the Quran and Sunnah in order to create unity among Muslims.
                                    <br />
                                    3) Arranging educational programs for all members of the family.
                                    <br />
                                    4) Promoting joint action among Muslim organizations of the Greater Portland and Northwest Oregon areas.
                                    <br />
                                    5) Developing mutual understanding with and among non-Muslims in order to communicate effectively the principles of Islam to them.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* History part */}
            <div>
                <div className="flex flex-col justify-around items-center gap-5 mt-8 mb-5">
                    <div
                        className="relative w-full h-40 flex justify-center mx-72 px-96"
                        style={{ backgroundImage: `url('/background.png')` }}
                    >
                        <div className="absolute inset-0 bg-white opacity-75"></div>
                        <div className="flex justify-center items-center max-w-full my-12 font-serif z-20">
                            <button className="bg-white rounded-full border-4 border-green-600 px-8 py-2 text-green-600 font-medium text-2xl font-sans" >
                                History
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className=" flex items-center justify-center my-4 ">
                        <div className="bg-white p-4 rounded-3xl shadow-md w-11/12 mx-4 relative">
                            <div className="text-left">
                                <p>
                                    Around 1987, a few muslim families in the general suburbs of Portland felt
                                    the need for a Masjid within an easy driving distance. A meeting was held
                                    and as a means of evaluating both the real need and the ability of the local
                                    families to establish and sustain a Masjid, a weekly Mussallah was proposed.
                                    Consequently these families decided to perform one prayer daily in one another's
                                    homes in order to validate the need for a mosque. They prayed the Maghreb or
                                    the Eisha prayer together over the course of several months, at the end of which
                                    they decided that the trial period had been successful and that it was time to
                                    begin the search for a permanent location.
                                </p>
                                <br/>
                                <p>
                                    Funds were raised from the local muslim community and in autumn of 1994 they
                                    purchased a lot with a small house, which they were able to get the county to
                                    re-zone for conversion into a mosque. In 1995 fundraising began in earnest for
                                    a more traditional mosque structure. In 2000 the Bilal Mosque purchased two
                                    adjacent lots, which they successfully got re-zoned and added to the original
                                    lot. In 2001, a modular trailer was put on the adjacent lot as a temporary means
                                    of providing adequate space for Sunday school classes, holding meetings, hosting
                                    interfaith events, and accommodating the overflow during Friday congregational
                                    prayers and during Ramadan.
                                </p>
                                <br/>
                                <p>
                                    Bilal Mosque association would humbly like to acknowledge with deep appreciation
                                    the patience, assistance, guidance and good support that we have received and
                                    continue to receive from the neighborhood, the county, the local elected officials
                                    and members in the law enforcement communit.
                                    <br />
                                    <br/>
                                    The Masjid is managed by an Masjid Committee. The Committee reports to the Board of Trustees .
                                    <br />
                                    <br/>
                                    Bilal Masjid is currently located in Beaverton at 4115 SW 160th, Beaverton OR 97007.
                                </p>
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

export default AboutUs;
