import "./signup.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";

const Login = () => {
    const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // handleSubmit attempts to log the user in
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission action
    try {
      await doSignInWithEmailAndPassword(email, password);
      console.log("Login successful", { email }); 
      navigate("/landing"); // Redirect the user to the homepage after successful login
    } catch (error) {
      console.error("Login failed", error); 
    }
  };

  // Navigates to sign up page
  const handleSignUpClick = () => {
    navigate("/signup"); 
  };

  return (
    <div className="main">
      {userLoggedIn && navigate("/Landing")}
      <div className="login">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" aria-hidden="true">
            Sign In
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="pswd"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Sign In" className="cfa" />{" "}
        </form>
        <span
          className="forgotPasswordSwitch"
          onClick={() => navigate("/forgotPassword")}
        >
          Forgot password? Click here
        </span>
        <span className="signUpSwitch" onClick={handleSignUpClick}>
          Don't have an account? Sign Up
        </span>
      </div>
    </div>
  );
};

export default Login;
