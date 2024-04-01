import React from "react";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Landing from "./pages/Landing";
import Admin from "./pages/admin/admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import EventDetails from './pages/EventDetails'; // Import your event details component

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
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
