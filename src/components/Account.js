import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

import './Account.css';

export default function Account(props) {
    const [loginPanel, setLoginPanel] = useState(false);

    return (
        <>
            <button className="account" onClick={() => {setLoginPanel(!loginPanel)}}>
                <FaUserCircle className="account-icon" size={30} color={props.alternate ? 'white' : 'black'}/>
            </button>
            {loginPanel &&
            <div className="login-panel">
                test
            </div>
        }
        </>
    );   
}
