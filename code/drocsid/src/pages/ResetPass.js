import "./ResetPass.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


function ResetPass() {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/");
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

  };

  const handleResetPass = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }


  return (
    <div className="main">
      <div className="resetpass">
        <form onSubmit={handleSubmit}>
          <div className="txt">
            <label>Reset Password</label>
          </div>
          <input
            type="email"
            name="e-mail"
            placeholder="e-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input onClick={handleResetPass} type="submit" value="Send Verification" className="buttn" />
        </form>
        <button onClick={handleSignInClick} className="buttn">Back to Sign In</button>
      </div>
    </div>
  );

}

export default ResetPass;