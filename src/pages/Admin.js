import React from 'react';
import { useState } from 'react';
//import { getAuth } from 'firebase/auth';
import { db } from '../firebase-config.js';
import { collection } from 'firebase/firestore';
import ExitImg from '../images/General/exitDoor.png';

import './Admin.css';

export default function Admin() {
  //const currUserName = getAuth().currentUser.displayName;
  const currUserName = "John Doe";
  const [currTab, setCurrTab] = useState("Executives");
  const execRef = collection(db, 'Executives');

  function logout() {
    //Insert code here
    console.log("This is where I would put a logout method if I had one");
  }

  function change_tab(tab) {
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

  const handleEdit = (index, data, setEditIndex, setEditedData) => {
    setEditIndex(index);
    setEditedData({ ...data[index] });
  };
 
  const handleSave = (index, data, editedData, setData, setEditIndex) => {
    const newData = [...data];
    newData[index] = editedData;
    setData(newData);
    setEditIndex(null);
  };
 
  const handleDelete = (index, data, setData) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleAdd = (data, editedData, setData, setEditIndex) => {
    const newData = [...data, editedData];
    setData(newData);
    setEditIndex(null);
  }

  const handleCancel = (setEditIndex) => {
    setEditIndex(null);
  }
 
  const handleInputChange = (field, value, setEditedData) => {
    setEditedData((prevData) => ({ ...prevData, [field]: value }));
  };
 
 
  function ExecTable() {
    const [data, setData] = useState([
      { id: 1, name: 'Jane Doe', position: 'President', image: 'https://example.com/johndoe.jpg' },
      { id: 2, name: 'John Doe', position: 'Vice President', image: 'https://example.com/janedoe.jpg' },
      // Add more rows as needed
    ]);
 
    const [editIndex, setEditIndex] = useState(null);
    const [editedData, setEditedData] = useState({ name: '', position: '', image: '' });

    const execHandleAddInit = () => {
      setEditIndex('plus');
      setEditedData({ name: '', position: '', image: '' });
    }

    const execHandleChange = (field, value) => {
      return handleInputChange(field, value, setEditedData);
    };
 
    return (
      <table className="view-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Picture</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id}>
              <td>{editIndex === index ? <input type="text" value={editedData.name} onChange={(e) => execHandleChange('name', e.target.value)} /> : row.name}</td>
              <td>{editIndex === index ? <input type="text" value={editedData.position} onChange={(e) => execHandleChange('position', e.target.value)} /> : row.position}</td>
              <td>{editIndex === index ? <input type="text" value={editedData.image} onChange={(e) => execHandleChange('image', e.target.value)} /> : row.image}</td>
              <td>
                {editIndex === index ? (
                  <button onClick={() => handleSave(index, data, editedData, setData, setEditIndex)} className="view-button">Save</button>
                ) : (
                  <>
                  <button onClick={() => handleEdit(index, data, setEditIndex, setEditedData)} className="view-button">Edit</button>
                  <button onClick={() => handleDelete(index, data, setData)} className="view-button">Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
        {editIndex === 'plus' ? (
          <tr>
            <td><input type="text" value={editedData.name} onChange={(e) => execHandleChange('name', e.target.value)} /></td>
            <td><input type="text" value={editedData.position} onChange={(e) => execHandleChange('position', e.target.value)} /></td>
            <td><input type="text" value={editedData.image} onChange={(e) => execHandleChange('image', e.target.value)} /></td>
            <td>
              <>
                <button onClick={() => handleAdd(data, editedData, setData, setEditIndex)} className="view-button">Add</button>
                <button onClick={() => handleCancel(setEditIndex)} className="view-button">Cancel</button>
              </>
            </td>
          </tr> 
        ) : (
          <tr>
            <td /> <td /> <td /> <td><button onClick={() => execHandleAddInit()} className="add-button">+</button></td>
          </tr>
        )}
       </tbody>
      </table>
    );
  };


  function RightView() {
    switch (currTab) {
      case "Executives":
        return (
          <ExecTable />
        )
      case "Main Slideshow":
        return (
          <p>Insert Main Slideshow View Here</p>
        )
      case "Recent Events":
        return (
          <p>Insert Recent Events View Here</p>
        )
      case "Recent Toys":
        return(
          <p>Insert Recent Toys View Here</p>
        )
      case "Old Toys":
        return (
          <p>Insert Old Toys View Here</p>
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
          <img src={ExitImg} alt="Log Out" className="exit" onClick={logout} />
        </div>
      </div>

      <div className="body">
        <div className="left-body">
          <div className="title">Dashboard</div>
          <Tab tabName="Executives" />
          <Tab tabName="Main Slideshow" />
          <Tab tabName="Recent Events" />
          <Tab tabName="Recent Toys" />
          <Tab tabName="Old Toys" />
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
