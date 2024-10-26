import React from "react";
import { useState } from "react";
import LocationBtn from './LocationBtn';
import "./Navbar.css";
import "./output.css"
import { Link } from "react-router-dom";

const Navbar = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };
  const [DropdownOpen, setDropdownOpen] = useState(false);
  const Dropdown = () => {
    setDropdownOpen(!DropdownOpen); // Toggle dropdown visibility
  };
  return (
    <div className=" navbar w-full relative z-100">
      <div className="flex flex-col justify-center items-center font-noto-sans text-black relative z-100">
        <div className="flex justify-between items-center w-full px-4 py-3 bg-white">
          <div>
            <Link to="/future">
              <img className="ml-4 h-16" loading="lazy" alt="Logo" src="/bilallogohighresolution-1@2x.png" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden md:hidden">
            <button onClick={toggleMobileMenu} id="menu-btn" className="block text-gray-800 focus:outline-none">
              <img className="h-6 w-6" src="/Menu.png" />
            </button>
          </div>

          {/* Desktop Menu */}
          <nav id="menu" className="sm:hidden md:flex lg:flex justify-center gap-10 items-center relative z-100">
            <Link to="/about" className="no-underline text-black hover:text-gray-700">About Us</Link>
            {/* <Link to="/under-construction" className="no-underline text-black hover:text-gray-700">Services</Link> */}
            <div className="relative group z-50">
              <a href="#" className="no-underline text-black hover:text-gray-700">Services</a>
              <div className="absolute  dropdown mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200  left-1/2 transform -translate-x-1/2 z-50">
                <Link to="/funeral" className="block px-4 py-2 text-gray-800 hover:bg-green-200">Funeral</Link>
                <a href="https://www.bilalsundayschool.com/"
                  className="block px-4 py-2 text-gray-800 hover:bg-green-200">Sunday School</a>
                <Link to="/social" className="block px-4 py-2 text-gray-800 hover:bg-green-200">Social Services</Link>
                <a href="https://pdxil.librarika.com/" className="block px-4 py-2 text-gray-800 hover:bg-green-200">
                  Islamic Library</a>
                <Link to="/cemetry" className="block px-4 py-2 text-gray-800 hover:bg-green-200">Cemetry</Link>
                <Link to="/outreach" className="block px-4 py-2 text-gray-800 hover:bg-green-200">Outreach</Link>
              </div>
            </div>
            <Link to="/events" className="no-underline text-black hover:text-gray-700">Calendar</Link>

            {/* Donations Dropdown */}
            <div className="relative group z-50">
              <a href="#" className="no-underline text-black hover:text-gray-700">Donations</a>
              <div className="absolute  dropdown mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200  left-1/2 transform -translate-x-1/2 z-50">
                <a href="https://us.mohid.co/or/portland/bma/masjid/online/donation"
                  className="block px-4 py-2 text-gray-800 hover:bg-green-200">Donate via Card/Paypal</a>
                <a href="https://bilalmasjid.com/Information/donate.aspx"
                  className="block px-4 py-2 text-gray-800 hover:bg-green-200">Donate Stock</a>
              </div>
            </div>

            {/* Location Dropdown */}


            <Link to="/announcement" className="no-underline text-black hover:text-gray-700">Announcement</Link>
          </nav>

          {/* Location Button */}
          <div id="location" className="sm:hidden md:flex lg:flex items-center space-x-4 w-36 relative z-50">
            {/* <div className="dropdown relative"> */}

            {/* <div className="relative group z-50">
              <  LocationBtn />
              <div className="absolute left-0 dropdown mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                <a href="https://www.google.com/maps/place/17865+NW+St+Helens+Rd,+Portland,+OR+97231,+USA/@45.652206,-122.854286,1218m/data=!3m1!1e3!4m6!3m5!1s0x549500bad4c78dfd:0xb954239e1b407ea8!8m2!3d45.6522063!4d-122.8542856!16s%2Fg%2F11ggs1q0xp?hl=en&entry=ttu&g_ep=EgoyMDI0MTAyMi4wIKXMDSoASAFQAw%3D%3D" 
                className="block px-4 py-2 text-black hover:bg-gray-100 flex items-center">
                  Janaza
                <img className="h-4 w-4 ml-6 inline-block" src="/address@2x.png" alt="Address" />
                </a>
                <a href="https://www.google.com/maps/place/Bilal+Masjid/@45.490128,-122.845189,17z/data=!4m6!3m5!1s0x54950e89864030d7:0xd92f72b1095a37d9!8m2!3d45.490128!4d-122.8426141!16s%2Fg%2F1tdw35jr?authuser=0&entry=ttu&g_ep=EgoyMDI0MTAyMi4wIKXMDSoASAFQAw%3D%3D"
                 className="block px-4 py-2 text-black hover:bg-gray-100 flex items-center">
                  Mosque
                <img className="h-4 w-4 ml-4 inline-block" src="/mosque@2x.png" alt="Mosque" />
                </a>
               
              </div>
            </div> */}
          </div>
        </div>


        {/* Mobile Menu */}
        <div id="mobile-menu" className={`${isMobileMenuOpen ? 'block' : 'hidden'
          } sm:hidden flex flex-col justify-center items-center mt-4 bg-white shadow-md w-full py-4`} >
          {/* Menu Links */}
          <Link to="/about" className="no-underline text-black hover:text-gray-700 py-2 block text-center w-full">
            About Us
          </Link>
          {/* <Link to="/under-construction" className="no-underline text-black hover:text-gray-700 py-2 block text-center w-full">
            Services
          </Link> */}
          <div className="relative w-full text-center">
            <button
              onClick={Dropdown}
              id="services-button"
              className="no-underline text-black hover:text-gray-700 py-2 w-full block text-center"
            >
              Services
            </button>
            <div
              id="services-dropdown"
              className={`${DropdownOpen ? 'flex' : 'hidden'
                } flex-col justify-center items-center bg-white border border-gray-200 rounded-md shadow-lg w-48 z-50 relative left-1/2 transform -translate-x-1/2 mt-1`}
            >
              <Link to="/funeral" className="block px-4 py-2 text-gray-800  w-full text-center hover:bg-green-200">Funeral</Link>
              <a href="https://www.bilalsundayschool.com/"
                className="block px-4 py-2 text-gray-800  w-full text-center hover:bg-green-200">Sunday School</a>
              <Link to="/social" className="block px-4 py-2 text-gray-800  w-full text-center hover:bg-green-200">Social Services</Link>
              <a href="https://pdxil.librarika.com/" className="block px-4 py-2 text-gray-800  w-full text-center hover:bg-green-200">
                Islamic Library</a>
              <Link to="/cemetry" className="block px-4 py-2 text-gray-800  w-full text-center hover:bg-green-200">Cemetry</Link>
              <Link to="/outreach" className="block px-4 py-2 text-gray-800  w-full text-center hover:bg-green-200">Outreach</Link>
              
            </div>
          </div>
          <Link to="/events" className="no-underline text-black hover:text-gray-700 py-2 block text-center w-full">
            Calendar
          </Link>

          {/* Dropdown Menu */}
          <div className="relative w-full text-center">
            <button
              onClick={toggleDropdown}
              id="donations-button"
              className="no-underline text-black hover:text-gray-700 py-2 w-full block text-center"
            >
              Donations
            </button>
            <div
              id="donations-dropdown"
              className={`${isDropdownOpen ? 'flex' : 'hidden'
                } flex-col justify-center items-center bg-white border border-gray-200 rounded-md shadow-lg w-48 z-50 relative left-1/2 transform -translate-x-1/2 mt-1`}
            >
              <a
                href="https://us.mohid.co/or/portland/bma/masjid/online/donation"
                className="block px-4 py-2 text-gray-800  w-full text-center hover:bg-green-200"
              >
                Donate via Card/Paypal
              </a>
              <a
                href="https://bilalmasjid.com/Information/donate.aspx"
                className="block px-4 py-2 text-gray-800  w-full text-center hover:bg-green-200"
              >
                Donate Stock
              </a>
            </div>
          </div>

          {/* Announcement Link */}
          <Link to="/announcement" className="no-underline text-black hover:text-gray-700 py-2 block text-center w-full">
            Announcement
          </Link>

          {/* Location Button */}
          {/* <div className="flex items-center justify-center w-36 relative mt-4">
            <LocationBtn />
          </div> */}
        </div>
      </div>
    </div>

  );
};

export default Navbar;

