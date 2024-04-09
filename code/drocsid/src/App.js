import React from "react";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Landing from "./pages/Landing";
import Admin from "./pages/admin/admin";
import ResetPass from "./pages/ResetPass";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import EventDetails from './pages/EventDetails';
import BookingPage from './pages/BookingPage';
import BookingSuccessPage from './pages/BookingSuccessPage';
import UserProfile from "./pages/UserProfile";
import CreateEvent from './pages/CreateEvent';
import EventStatusPage from './pages/EventStatusPage';
import Organizer from "./pages/Organizer";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/event/:eventId" element={<EventDetails />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/book/:eventId" element={<BookingPage />} />
          <Route path="/booking-success" element={<BookingSuccessPage />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/organizer" element={<Organizer />} />
          <Route path="/event-status" element={<EventStatusPage />} />
          <Route path="/resetpass" element={<ResetPass />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
