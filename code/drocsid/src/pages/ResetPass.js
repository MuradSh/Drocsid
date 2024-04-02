import "./ResetPass.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPass() {

    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate("/");
      };

    const handleSubmit = async (event) => {

        event.preventDefault(); 

    };

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
              <input type="submit" value="Send Verification" className="buttn" />
            </form>
          </div>
        </div>
      );

}

export default ResetPass;