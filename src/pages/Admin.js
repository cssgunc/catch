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

  const [execData, setExecData] = useState([
    { id: 1, name: 'Jane Doe', position: 'President', image: 'https://example.com/johndoe.jpg' },
    { id: 2, name: 'John Doe', position: 'Vice President', image: 'https://example.com/janedoe.jpg' },
  ]);
  const [slideshowData, setSlideshowData] = useState([
    { id: 1, imageId: '8437132145', altText: 'Building a Dinosaur!'},
    { id: 2, imageId: '1834972562', altText: 'Group Photo'},
  ]);
  const [recentToysData, setRecentToysData] = useState([
    { id: 1, description: 'temp airplane description', name: 'Airplane', imageId: 'airplane', altText: 'Modified Airplane Toy', buildUrl: 'https://docs.google.com/presentation/d/1sG6zYR71rNoACMY5j51roubwaqilKjNm_EgJfxFn7VU/edit#slide=id.p' },
    { id: 2, description: 'temp bus description', name: 'School Bus', imageId: 'bus', altText: 'Modified Bus Toy', buildUrl: 'bus URL' },
  ]);
  const [oldToysData, setOldToysData] = useState([
    { id: 1, description: 'temp alien description', name: 'Alien', imageId: 'alien', altText: 'Modified Alien Toy', buildUrl: 'alien URL' },
    { id: 2, description: 'temp dog description', name: 'Dog', imageId: 'dog', altText: 'Modified Dog Toy', buildUrl: 'dog URL' },
  ]);
  const [donationsData, setDonationsData] = useState([
    { id: 1, imageId: 'org6image', altText: 'aversboro alt text', organization: 'Aversboro Elementary School', totalDonations: 10, donationNumber: 1, description: 'aversboro description' },
    { id: 2, imageId: 'org3image', altText: 'levine alt text', organization: "Levine Children's Hospital", totalDonations: 32, donationNumber: 2, description: 'levine description' },
  ]);
  const [mediaData, setMediaData] = useState([
    { id: 1, imageId: 'image id 1', altText: 'alt text 1', header: 'header 1', description: 'description 1', articleUrl: 'article URL 1' },
    { id: 2, imageId: 'image id 2', altText: 'alt text 2', header: 'header 2', description: 'description 2', articleUrl: 'article URL 2' },
  ]);


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
 

  function Table(props) {
    const initial_state = props.initial_state;
    const data = props.data;
    const setData = props.setData;
    const headers = props.headers;

    const [editIndex, setEditIndex] = useState(null);
    const [editedData, setEditedData] = useState(initial_state);
    const init_keys = Object.keys(initial_state);

    const handleAddInit = () => {
      setEditIndex('plus');
      setEditedData(initial_state);
    }

    const handleChange = (field, value) => {
      console.log(field);
      console.log(value);
      return handleInputChange(field, value, setEditedData);
    };
 
    return (
      <table className="view-table">
        <thead>
          <tr>
            {headers.map(header => <th key={header}>{header}</th>)}
            <th />
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id}>
              {init_keys.map((field) => (
                <td key={field}>{editIndex === index ? <input type="text" value={editedData[field]} onChange={(e) => handleChange(field, e.target.value)} /> : row[field]}</td>
              ))}
              <td>
                {editIndex === index ? (
                  <>
                    <button onClick={() => handleSave(index, data, editedData, setData, setEditIndex)} className="view-button">Save</button>
                    <button onClick={() => handleCancel(setEditIndex)} className="view-button">Cancel</button>
                  </>
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
              {init_keys.map((field) => (
                <td key={field}><input type="text" value={editedData[field]} onChange={(e) => handleChange(field, e.target.value)} /></td>
              ))}
              <td>
                <>
                  <button onClick={() => handleAdd(data, editedData, setData, setEditIndex)} className="view-button">Add</button>
                  <button onClick={() => handleCancel(setEditIndex)} className="view-button">Cancel</button>
                </>
              </td>
            </tr> 
          ) : (
            <tr>
              {init_keys.map((field) => <td key={field}/>)}
              <td><button onClick={handleAddInit} className="add-button">+</button></td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };


  function RightView() {
    const initializeVals = (obj) => {
      let newObj = {...obj};
      delete newObj.id;
      for (const field of Object.keys(newObj)) {
        if ((typeof obj[field]) === "string") {
          newObj[field] = '';
        } else if ((typeof obj[field]) === "number") {
          newObj[field] = 0;
        } else {
          newObj[field] = null;
        }
      }
      return newObj;
    } 
    switch (currTab) {
      case "Executives":
        const execInit = initializeVals(execData[0]);
        console.log(execInit);
        const execHeaders = ['Name', 'Position', 'Picture'];
        return (
          <Table initial_state={execInit} data={execData}  setData={setExecData} headers={execHeaders} />
        )
      case "Main Slideshow":
        const slideInit = initializeVals(slideshowData[0]);
        const slideHeaders = ['Image ID', 'Alternate Text'];
        return (
          <Table initial_state={slideInit} data={slideshowData}  setData={setSlideshowData} headers={slideHeaders} />
        )
      case "Recent Events":
        return (
          <p>Insert Recent Events View Here</p>
        )
      case "Recent Toys":
        const recentToysInit = initializeVals(recentToysData[0]);
        const recentToysHeaders = ['Description', 'Name', 'Image ID', 'Alternate Text', 'Build URL'];
        return (
          <Table initial_state={recentToysInit} data={recentToysData}  setData={setRecentToysData} headers={recentToysHeaders} />
        )
      case "Old Toys":
        const oldToysInit = initializeVals(oldToysData[0]);
        const oldToysHeaders = ['Description', 'Name', 'Image ID', 'Alternate Text', 'Build URL'];
        return (
          <Table initial_state={oldToysInit} data={oldToysData}  setData={setOldToysData} headers={oldToysHeaders} />
        )
      case "Donations":
        const donationsInit = initializeVals(donationsData[0]);
        const donationsHeaders = ['Image ID', 'Alternate Text', 'Organization', 'Total Donations', 'Number of Donations', 'Description'];
        return (
          <Table initial_state={donationsInit} data={donationsData}  setData={setDonationsData} headers={donationsHeaders} />
        )
      case "Media":
        const mediaInit = initializeVals(mediaData[0]);
        const mediaHeaders = ['Image ID', 'Alternate Text', 'Header', 'Description', 'Article URL'];
        return (
          <Table initial_state={mediaInit} data={mediaData}  setData={setMediaData} headers={mediaHeaders} />
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
