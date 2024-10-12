import React from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import { ClerkProvider } from '@clerk/clerk-react';
import About from "./components/About";
import EventsCalendar from "./components/EventsCalendar";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login"; 
import RequestedEvents from "./components/RequestedEvents"; 
import ApprovedEvents from "./components/ApprovedEvents"; 
import DeniedEvents from "./components/DeniedEvents"; 
import AnnouncementUpdate from "./components/AnnouncementUpdate.jsx";
import { AnnouncementProvider } from './context/AnnouncementContext'; 
import PrayerTimeUploader from './components/PrayerTimeUploader';
import ProtectedRoute from './components/ProtectedRoute';
import EventDetails from "./components/EventDetails";
import KhateebSchedule from "./components/KhateebSchedule.jsx";
import Announcements from "./components/Announcements.jsx";
import UnderConstruction from './components/UnderConstruction';
import UpcomingEvents from "./components/UpcomingEvents.jsx";
import EventUpload from "./components/EventUpload.jsx";


const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
function App() {
  return (
    <Router>
      <ClerkProvider publishableKey={clerkPublishableKey} signOutAfter={0}>
     
        <AnnouncementProvider>
          <Routes>
          <Route path="/" element={<Navigate to="/future" />} />   {/* Redirect from "/" to "/future" */}
            <Route path="/future" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<EventsCalendar />} />
            <Route path="/login" element={<Login />} />
            <Route path="/request" element={<RequestedEvents />} />
            <Route path="/approved" element={<ApprovedEvents />} />
            <Route path="/denied" element={<DeniedEvents />} />
            <Route path="/announcement" element={<Announcements />} />
            <Route path="/update" element={<AnnouncementUpdate />} />
            <Route path="/event-details/:eventId" element={<EventDetails />} />
            <Route path="/prayer-times" element={<PrayerTimeUploader />} />
            <Route path="/khateeb" element={<KhateebSchedule />} />
            <Route path="/under-construction" element={<UnderConstruction />} />
            <Route path="/upcomingevent" element={<UpcomingEvents/>} />
            <Route path="/eventupload" element={<EventUpload/>} />
          
            <Route
            path="/admin-panel"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          </Routes>
        </AnnouncementProvider>
      
      </ClerkProvider>
    </Router>
  );
}

export default App;
