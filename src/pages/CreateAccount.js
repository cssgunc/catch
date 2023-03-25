import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config.js';
import './CreateAccount.css'

export default function CreateAccount() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [accountType, setAccountType] = useState('');
    const [al1, setAl1] = useState('');
    const [al2, setAl2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');

    const [validEmail, setValidEmail] = useState(true);
    const [samePS, setSamePS] = useState(true);
    const [accountChosen, setAccountChosen] = useState(true);

    const handleClick = () => {

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if(emailRegex.test(email)) {
            setValidEmail(true);
        } else {
            setValidEmail(false);
            return;
        }

        if (password !== confirmPassword) {
            setSamePS(false);
            return;
        } else {
            setSamePS(true);
        }

        if (accountType === 'personal' || accountType === 'organization') {
            setAccountChosen(true);
        } else {
            setAccountChosen(false);
            return;
        }

        if (al1 === '') {
            setSamePS(false);
            return;
        } else {
            setSamePS(true);
        }
        
        const auth = getAuth();
        const userCredential = createUserWithEmailAndPassword(auth, email, password)
                .catch((error) => {console.log(error)});
        
        
        sendEmailVerification(userCredential);
        console.log("test");
        console.log(userCredential.uid);
        console.log("test");

        try {
            setDoc(doc(db, "users", userCredential.uid), {
                name: name,
                email: email,
                type: accountType,
                address: {
                    addressLine1: al1,
                    addressLine2: al2,
                    city: city,
                    state: state,
                    zipCode: zipCode  
                }
            });
        } catch (error) {
            console.error("Error adding user to database: ", error);
        }


        
    }

    return (
        <div className='container'>
            <Link to="/">
                <div className='back-icon'>
                    <button className='back-button'>
                        <FaChevronLeft size={40}/>
                    </button>
                </div>
            </Link>
            <form className='form-container'>
                <b>Name<span id='required'> *</span></b>
                <input type="text" placeholder="Enter Name" name="name" onChange={(e) => setName(e.target.value)} required/>

                <b>Email<span id='required'> *</span></b>
                <input type="text" placeholder="Enter Email" name="email" onChange={(e) => setEmail(e.target.value)} required/>

                <b>Password<span id='required'> *</span></b>
                <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} name="psw" required/>

                <b>Repeat Password<span id='required'> *</span></b>
                <input type="password" placeholder="Repeat Password" onChange={(e) => setConfirmPassword(e.target.value)} name="psw-repeat" required/>

                <div className='grid-1'>
                    <b>Account Type<span id='required'> *</span></b>
                    <select name="account-type" onChange={(e) => setAccountType(e.target.value)} required>
                        <option value="" disabled="disabled" selected="selected">...</option>
                        <option value="personal">Personal</option>
                        <option value="organization">Organization</option>
                    </select>
                    <b>Phone Number<span id='required'> *</span></b>
                    <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Enter Phone Number" required />
                </div>

                <b>Address Line 1<span id='required'> *</span></b>
                <input type='text' placeholder="Enter Address Line 1" name="al1" onChange={(e) => setAl1(e.target.value)} required/>

                <b>Address Line 2</b>
                <input type='text' placeholder="Enter Address Line 2" onChange={(e) => setAl2(e.target.value)} name="al2"/>

                <div className='address'>
                    <b className='city'>City<span id='required'> *</span></b>
                    <b className='state'>State<span id='required'> *</span></b>
                    <b className='zip-code'>Zip Code<span id='required'> *</span></b>
                    <input type='text' className='city-input' placeholder="Enter City" onChange={(e) => setCity(e.target.value)} name="city" />
                    <select name="state" className='state-select' onChange={(e) => setState(e.target.value)} required>
                        <option value="" disabled="disabled" selected="selected">Select State</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AS">American Samoa</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="UM-81">Baker Island</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="GU">Guam</option>
                        <option value="HI">Hawaii</option>
                        <option value="UM-84">Howland Island</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="UM-86">Jarvis Island</option>
                        <option value="UM-67">Johnston Atoll</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="UM-89">Kingman Reef</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="UM-71">Midway Atoll</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="UM-76">Navassa Island</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="MP">Northern Mariana Islands</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="UM-95">Palmyra Atoll</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="PR">Puerto Rico</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UM">United States Minor Outlying Islands</option>
                        <option value="VI">United States Virgin Islands</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="UM-79">Wake Island</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                    <input type='text' pattern='[0-9]{5}' className='zip-input'  placeholder="Enter Zip Code" name="zip-code" onChange={(e) => setZipCode(e.target.value)}/>
                </div>

                <button type='button' className='account-submit' onClick={handleClick}>Submit</button>
                <div style={{color: 'red'}}>
                    {validEmail ? <></> : <>Enter a valid email!</>}
                    {!validEmail || samePS ? <></> : <>Passwords are not the same!</>}
                </div>
            </form>
        </div>
    )
}