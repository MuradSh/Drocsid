// Login.js
import './signup.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Create navigate function

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submit action (page reload)
    // Here, you can handle the login logic, like calling an API to authenticate the user
    console.log('Login Submitted', { email, password });
  };

  const handleSignUpClick = () => {
    navigate('/signUp'); // Navigate to the signUp route
  };

  return (
    <div className="main">
      <div className="login">
        <form>
          <label htmlFor="chk" aria-hidden="true">Sign In</label>
          <input type="email" name="email" placeholder="Email" required="" />
          <input type="password" name="pswd" placeholder="Password" required="" />
          <button>Sign In</button>
        </form>
        <span className='signUpSwitch' onClick={handleSignUpClick} >Don't have an account? Sign Up</span>
      </div>
    </div>
  );
}

export default Login;
