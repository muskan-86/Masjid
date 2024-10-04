// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faDollarSign, faBullhorn, faClock } from '@fortawesome/free-solid-svg-icons';

import Navbar from "./Navbar.jsx";
const AdminPanel = () => {
  const [showEventDropdown, setShowEventDropdown] = useState(false);
  const [showPrayerDropdown, setShowPrayerDropdown] =useState(false);

  const toggleDropdown = () => {
    setShowEventDropdown((prevState) => !prevState); // Toggle dropdown visibility
    
  };

  const dropdown = () => {
    setShowPrayerDropdown((preState) => !preState);
  }
  console.log("Sidebar component rendered!"); 

  return (
    <div className='w-full'>
      <Navbar/>
      <div className="w-64 h-screen  bg-mediumseagreen-300 text-white relative z-10">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <nav className="mt-6">
        <ul>
            <li className="mt-3">
              <Link to="/update" className="hover:text-gray-300 flex items-center">
                <FontAwesomeIcon icon={faBullhorn} className="mr-2" />
                Announcement 
              </Link>
            </li>
            <li className="mt-3 relative">
              <div 
                className="flex items-center cursor-pointer hover:text-gray-300"
                onClick={toggleDropdown} // Toggle dropdown on click
              >
                <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                Event Management
              </div>
              {/* Dropdown Menu */}
              {showEventDropdown && (
                <ul className="relative left-0 mt-2 bg-white text-black rounded shadow-lg p-2 w-56 z-10">
                  <li className="p-2 hover:bg-green-200 rounded">
                    <Link to="/approved">Approved Events</Link>
                  </li>
                  <li className="p-2 hover:bg-green-200 rounded">
                    <Link to="/denied">Denied Events</Link>
                  </li>
                  <li className="p-2 hover:bg-green-200 rounded">
                    <Link to="/request">Requested Events</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="mt-3">
              <Link to="/donations" className="hover:text-gray-300 flex items-center">
                <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                Donation Management
              </Link>
            </li>
           
            <li className="mt-3">
              <div 
                className="flex items-center cursor-pointer hover:text-gray-300"
                onClick={dropdown} // Toggle dropdown on click
              >
                <FontAwesomeIcon icon={faClock} className="mr-2" />
                Prayer Timings 
              </div>
              {/* Dropdown Menu */}
              {showPrayerDropdown && (
                <ul className="relative left-0 mt-2 bg-white text-black rounded shadow-lg p-2 w-56 z-10">
                  <li className="p-2 hover:bg-green-200 rounded">
                    <Link to="/prayer-times">Prayer times</Link>
                  </li>
                  <li className="p-2 hover:bg-green-200 rounded">
                    <Link to="/khateeb">Khateeb Schedule</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
    {/* <Footer/> */}
    </div>
    
  );
};

export default AdminPanel;
