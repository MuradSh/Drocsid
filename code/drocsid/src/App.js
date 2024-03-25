import React from "react";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import EventDetails from './pages/EventDetails';
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/event/:eventId" element={<EventDetails />} />
          <Route path="/book/:eventId" element={<BookingPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
