import React from 'react';
//import { getAuth } from 'firebase/auth';
import ExitImg from '../images/Toy Catolog/firetruck.jpg';

import './Admin.css';

//const currUserName = getAuth().currentUser.displayName;
const currUserName = "John Doe";
let currName = "Executives";

function change_tab(tab) {
  //Insert code here
  if (currName == tab) {
    console.log("User is already in " + tab);
  } else {
    console.log("User is currently switching to " + tab);
  }
}

function logout() {
  //Insert code here
  console.log("This is where I would put a logout method if I had one");
}

export default function Admin() {

  return (
    <div className="App">
      <div className="header">
        <div className="left">
          <b>CATCH Admin</b>
        </div>
        <div className="right">
          {currUserName}  
          <img src={ExitImg} className="exit" onClick={logout}/>
        </div>
      </div>

      <div className="body">
        <div className="left-body">
          <div className="title">Dashboard</div>
          <div className="menu-button-current" onClick={() => change_tab("Executives")}>Executives</div>
          <div className="menu-button" onClick={() => change_tab("Toys")}>Toys</div>
          <div className="menu-button" onClick={() => change_tab("Donations")}>Donations</div>
          <div className="menu-button" onClick={() => change_tab("Media")}>Media</div>
        </div>
        <div className="right-body">
          Insert table here
        </div>
      </div>
    </div>
  )
}
