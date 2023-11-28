import React, { useState } from 'react';
import { auth } from '../firebase-config'; 
import { signInWithEmailAndPassword } from 'firebase/auth';

function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const adminLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      setLoginError('');
    } catch (error) {
      setLoginError('Login failed: ' + error.message);
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
    <div>
      {!isLoggedIn ? (
        <div>
          <input 
            type="email" 
            value={email} 
            onChange={handleEmailChange} 
            placeholder="Email" 
          />
          <input 
            type="password" 
            value={password} 
            onChange={handlePasswordChange} 
            placeholder="Password" 
          />
          <button onClick={adminLogin}>Login</button>
          {loginError && <p>{loginError}</p>}
        </div>
      ) : (
        <div>
          <p>Welcome to the Admin Dashboard!</p>
          {/* more here later */}
        </div>
      )}
    </div>
  );
}

export default Admin;
