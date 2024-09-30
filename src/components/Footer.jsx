import React from "react";
import FollowButton from './FollowButton';
import "./output.css";
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <div className="overflow-x-hidden">
            {/* Footer */}
            <div className="flex flex-col w-full bg-slate-200  p-10">
                <div className="flex flex-row flex-wrap sm:flex-nowrap justify-around items-center gap-10 w-full bg-slate-200">
                    <div className="flex flex-col items-start">
                        <img className="h-24 my-4" loading="lazy" alt="Logo" src="./public/bilallogohighresolution-1@2x.png" />
                        <div className="my-4 flex flex-col gap-2">
                            <p>Address: 4115 SW 160th Beaverton, OR 97008</p>
                            <p>Email: bilalmasjid@bilalmasjid.com</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-12 items-start">
                        <div className="flex flex-col gap-4 font-medium">
                            <p className="font-semibold">Quick Links</p>
                            <p>About Us</p>
                            <p>Services</p>
                            <p>Community</p>
                            <Link to="/login" className="no-underline text-black hover:text-gray-700">Admin Panel</Link>
                        </div>
                        <div className="flex flex-col justify-center mx-4 items-center">
                            <div >
                                <FollowButton />
                            </div>
                            <div className="flex gap-3">
                                <div className="bg-mediumseagreen-300 rounded-full w-8 h-8">
                                    <a href="https://web.facebook.com/bilalmasjidbeaverton?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer">
                                        <img src="./public/Facebook-icon.png" alt="facebook icon" />
                                    </a>
                                </div>
                                <div className="bg-mediumseagreen-300 rounded-full w-8 h-8">
                                    <a href="https://chat.whatsapp.com/B8c6ngDZTkBI8RBs6JHEgm" target="_blank" rel="noopener noreferrer">
                                        <img src="./public/whatsapp-icon.svg" alt="whatsapp icon" />
                                    </a>
                                </div>
                                <div className="bg-mediumseagreen-300 rounded-full w-8 h-8">
                                    <a href="https://www.youtube.com/channel/UCYcsOfNe70UH_b65RdZmpRA" target="_blank" rel="noopener noreferrer">
                                        <img src="./public/youtube-icon.png" className="p-1" alt="youtube icon" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;

