import React from "react";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Landing from "./pages/Landing";
import ResetPass from "./pages/ResetPass";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/resetpass" element={<ResetPass />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
