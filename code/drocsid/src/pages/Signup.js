// SignUp.js
import './signup.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submit action (page reload)
    // Validation logic here, e.g., check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return; // Stops the function if passwords don't match
    }
    // Here, you can handle the sign-up logic, like calling an API to register the user
    console.log('SignUp Submitted', { username, email, password });
  };

  const handleSignUpClick = () => {
    navigate('/');
  }

  return (
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div className="signup">
        <form>
          <label htmlFor="chk" aria-hidden="true">Sign up</label>
          <input type="text" name="txt" placeholder="User name" required="" />
          <input type="email" name="email" placeholder="Email" required="" />
          <input type="password" name="pswd" placeholder="Password" required="" />
          <button>Sign up</button>
        </form>
        <span className='signInSwitch' onClick={handleSignUpClick} >Already have an account? Sign in</span>
      </div>
    </div>
  );
}

export default SignUp;
