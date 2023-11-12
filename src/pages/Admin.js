import React from 'react';
import { useState } from 'react';
//import { getAuth } from 'firebase/auth';
import ExitImg from '../images/Toy Catolog/firetruck.jpg';

import './Admin.css';

export default function Admin() {
  //const currUserName = getAuth().currentUser.displayName;
  const currUserName = "John Doe";
  const [currTab, setCurrTab] = useState("Executives");
  
  function logout() {
    //Insert code here
    console.log("This is where I would put a logout method if I had one");
  }
  
  function change_tab(tab) {
    //Insert code here
    console.log("User is currently switching to " + tab);
    setCurrTab(tab);
  }
  
  function Tab({ tabName }) {
    if (tabName === currTab) {
      return (
        <div className="menu-button-current">{tabName}</div>
      );
    } else {
      return (
        <div className="menu-button" onClick={() => change_tab(tabName)}>{tabName}</div>
      )
    }
  }

  function RightView() {
    switch (currTab) {
      case "Executives":
        return (
          <p>Insert Executives Table Here</p>
        )
      case "Toys":
        return (
          <p>Insert Toys View Here</p>
        )
      case "Donations":
        return (
          <p>Insert Donations View Here</p>
        )
      case "Media":
        return (
          <p>Insert Media View Here</p>
        )
      default:
        return (
          <p>Valid Tab Name not found</p>
        )

    }
  }

  return (
    <div className="App">
      <div className="header">
        <div className="left">
          <b>CATCH Admin</b>
        </div>
        <div className="right">
          {currUserName}  
          <img src={ExitImg} alt="Log Out" className="exit" onClick={logout}/>
        </div>
      </div>

      <div className="body">
        <div className="left-body">
          <div className="title">Dashboard</div>
          <Tab tabName="Executives" />
          <Tab tabName="Toys" />
          <Tab tabName="Donations" />
          <Tab tabName="Media" />
        </div>
        <div className="right-body">
          <RightView />
        </div>
      </div>
    </div>
  )
}
