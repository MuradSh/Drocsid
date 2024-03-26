import "./Signup.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";
import { getAnalytics, logEvent } from "firebase/analytics";
import { collection, updateDoc, query, getDocs, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const analytics = getAnalytics();
logEvent(analytics, 'notification_received');

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
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("loginTime", new Date().getTime());
      console.log("Login successful", email);
      await updateFirestore(email);
      navigate("/landing"); // Redirect the user to the homepage after successful login
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const updateFirestore = async (email) => {
    console.log(email);
    const col = collection(firestore, "users");
    const queryy = query(col, where("email", "==", email));
    const querySnapshot = await getDocs(queryy);
    const userRef = querySnapshot.docs[0].ref;
    await updateDoc(userRef, {
      lastLoggedIn: new Date(),
    });
    console.log("Document updated with ID: ", email);
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