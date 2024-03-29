import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import "./Login.css"; // Import a CSS file for styling (create this file with your styles)

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  let navigate = useNavigate();

  const adminLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      setLoginError("");
      navigate("/admin");
      window.location.reload(false);
    } catch (error) {
      setLoginError("Login failed: " + error.message);
      console.error("Error signing in with email and password", error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login-container">
      {!isLoggedIn ? (
        <div className="login-form">
          <img src="logo.png" alt="Logo" style={{ width: "100px" }} />
          <h2>Admin Login</h2>
          <input
            class="inputLogin"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
          />
          <input
            class="inputLogin"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
          <button class="loginButton" onClick={adminLogin}>
            Login
          </button>
          {loginError && <p className="error-message">{loginError}</p>}
        </div>
      ) : (
        <div className="welcome-message">
          <p>Welcome to the Admin Dashboard!</p>
        </div>
      )}
    </div>
  );
}

export default Login;
