import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

import './Account.css';

export default function Account(props) {
    const [loginPanel, setLoginPanel] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

        const signIn = (e) => {
            e.preventDefault();
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {console.log(userCredential)})
                .catch((error) => {console.log(error)})
        }

    return (
        <div className='account-container'>
            <button className="account" onClick={() => {setLoginPanel(!loginPanel)}}>
                <FaUserCircle className="account-icon" size={25} color={props.alternate ? 'white' : 'black'}/>
            </button>
            {loginPanel &&
            <div className="login-panel">
                <form className="login-form" onSubmit={signIn}>
                    <b>Log In</b>
                    <input className="text-input" type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <input className="text-input" type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <button className='form-submit' type='submit'>Sign In</button>
                </form>
                <Link to="/create-account">Create Account?</Link>
            </div>
            }
        </div>
    );   
}
