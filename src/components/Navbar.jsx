import React from "react";
import { useState } from "react";
import LocationBtn from './LocationBtn';
import "./Navbar.css";
import "./output.css"
import { Link } from "react-router-dom";

const Navbar = () => {
  // Toggle mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  return (
    <div className=" navbar w-full relative z-100">
      <div className="flex flex-col justify-center items-center font-noto-sans text-black relative z-100">
        <div className="flex justify-between items-center w-full px-4 py-3 bg-white">
          <div>
            <Link to="/">
              <img className="ml-4 h-16" loading="lazy" alt="Logo" src="/bilallogohighresolution-1@2x.png" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden md:hidden">
            <button onClick={toggleMobileMenu} id="menu-btn" className="block text-gray-800 focus:outline-none">
              <img className="h-6 w-6" src="./public/Menu.png" />
            </button>
          </div>

          {/* Desktop Menu */}
          <nav id="menu" className="sm:hidden md:flex lg:flex justify-center gap-10 items-center relative z-100">
            <Link to="/about" className="no-underline text-black hover:text-gray-700">About Us</Link>
            <Link to="/services" className="no-underline text-black hover:text-gray-700">Services</Link>
            <Link to="/events" className="no-underline text-black hover:text-gray-700">Calendar</Link>

            <div className="relative group z-100"> {/* Add z-50 to ensure it is above the background */}
              <a href="#" className="no-underline text-black hover:text-gray-700">Donations</a>
              <div className="absolute left-0 dropdown mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50"> {/* Ensure high z-index here */}
                <a href="https://us.mohid.co/or/portland/bma/masjid/online/donation"
                  className="block px-4 py-2 text-gray-800 hover:bg-green-200">Donate Online</a>
                <a href="https://bilalmasjid.com/Information/donate.aspx"
                  className="block px-4 py-2 text-gray-800 hover:bg-green-200">Donate Stock</a>
              </div>
            </div>

            <Link to="/announcement" className="no-underline text-black hover:text-gray-700">Announcement</Link>
          </nav>

          {/* Location Button */}
          <div id="location" className="sm:hidden md:flex lg:flex items-center space-x-4 w-36 relative z-100">
            <div className="dropdown relative">
              <LocationBtn />
              <div className="dropdown-menu min-w-32 absolute hidden bg-slate-100 shadow-lg rounded-lg mt-2 py-2 z-100">
                {/* Dropdown menu items */}
                <a href="#" className="no-underline block px-4 py-2 text-black hover:bg-gray-100 flex items-center">
                  Janaza
                  <img className="h-4 w-4 ml-6 inline-block" src="./public/address@2x.png" alt="Address" />
                </a>
                <a href="#" className="no-underline block px-4 py-2 text-black hover:bg-gray-100 flex items-center">
                  Mosque
                  <img className="h-4 w-4 ml-4 inline-block" src="./public/mosque@2x.png" alt="Mosque" />
                </a>
              </div>


            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden flex flex-col justify-center items-center mt-4 bg-white shadow-md w-full py-4`}>
          <Link to="/about" className="no-underline text-black hover:text-gray-700">About Us</Link>
          <Link to="/services" className="no-underline text-black hover:text-gray-700">Services</Link>
          <Link to="/events" className="no-underline text-black hover:text-gray-700">Calendar</Link>
          <div className="relative">
            <button onClick={toggleDropdown} id="donations-button" className="no-underline text-black hover:text-gray-700 py-2 block w-full text-left">
              Donations
            </button>
            <div id="donations-dropdown" className={`flex-col items-start bg-white border border-gray-200 rounded-md shadow-lg w-full mt-1 ${isDropdownOpen ? 'flex' : 'hidden'} z-50`}> {/* Ensure higher z-index */}
              <a href="https://us.mohid.co/or/portland/bma/masjid/online/donation"
                className="block px-4 py-2 text-gray-800 hover:bg-green-200 w-full">Donate Online</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-green-200 w-full">Donate Stock</a>
            </div>
          </div>
          <Link to="/announcement" className="no-underline text-black hover:text-gray-700">Announcement</Link>
          <div className="flex items-center justify-center w-36 relative mt-2">
            <div className="">
              <LocationBtn />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Navbar;

