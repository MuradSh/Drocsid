import "./Signup.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { collection, updateDoc, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submit action
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return; // Stops the function if passwords don't match
    }
    try {
      // Create user with email and password
      await doCreateUserWithEmailAndPassword(email, password);
      await addToFirestore(username, email);
      console.log("SignUp successful", { username, email });
      navigate("/landing"); // Redirect the user after successful sign-up
    } catch (error) {
      console.error("SignUp failed", error);
    }
  };

  const addToFirestore = async (username, email) => {
    console.log("Adding user to Firestore", {
      username: username,
      email: email,
      dateSignedUp: new Date(),
      lastLoggedIn: new Date(),
    });
    const docRef = await addDoc(collection(firestore, "users"),
      {
        username: username,
        email: email,
        dateSignedUp: new Date(),
        lastLoggedIn: new Date(),
      },
    );
    console.log("Document written with ID: ", docRef.id);
  }


  const handleSignInClick = () => {
    navigate("/");
  };

  return (
    <div className="main signupmain">
      <div className="signup">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" aria-hidden="true">
            Sign up
          </label>
          <input
            type="text"
            name="username"
            placeholder="User name"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input type="submit" value="Sign up" className="cfa" />
        </form>
        <span className="signInSwitch" onClick={handleSignInClick}>
          Already have an account? Sign in
        </span>
      </div>
    </div>
  );
}

export default SignUp;