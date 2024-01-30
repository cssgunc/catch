import React from "react";
import { useState } from "react";
//import { getAuth } from 'firebase/auth';
import { db } from "../firebase-config.js";
import { collection, doc, addDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import ExitImg from "../images/General/exitDoor.png";

import "./Admin.css";
import { FaChevronCircleDown } from "react-icons/fa";

export default function Admin() {
  //const currUserName = getAuth().currentUser.displayName;
  const currUserName = "John Doe";
  const [currTab, setCurrTab] = useState("Executives");

  const [deletedIds, setDeletedIds] = useState([]);
  const [addedIds, setAddedIds] = useState([]);
  const [editedIds, setEditedIds] = useState([]);

  const execRef = "exec";
  const slideshowRef = "mainSlideshow";
  const toysRef = "toys";
  const donationsRef = "donations";
  const mediaRef = "media";

  const [execData, setExecData] = useState([
    {
      id: 1,
      documentId: "president",
      name: "Bryce Menichella",
      position: "President",
      imageID: "president.jpg",
    },
    {
      id: 2,
      documentId: "vicePresident",
      name: "Katie Chai",
      position: "Vice President",
      imageID: "vp.jpg",
    },
  ]);
  const [slideshowData, setSlideshowData] = useState([
    { id: 1, documentId: "AAmkOF7cLS4Lwjzkw5U0", imageID: "8437132145" },
    { id: 2, documentId: "AaGzXdI3bZmwRnaJS5Dp", imageID: "1834972562" },
  ]);
  const [recentEvents, setRecentEvents] = useState([
    "Recent Event 1",
    "Recent Event 2",
    "Recent Event 3",
    "Recent Event 4",
  ]);
  const [selectedEvent, setSelectedEvent] = useState(recentEvents[0]);
  const [recentEventsData, setRecentEventsData] = useState({
    "Recent Event 1": [
      { id: 1, documentId: "64fNazZj2gT1uE4nsVBr", imageID: "event1_image1" },
      { id: 2, documentId: "EN75BnhRQB7qO5013ZJI", imageID: "event1_image2" },
    ],
    "Recent Event 2": [
      { id: 1, documentId: "21", imageID: "event2_image1" },
      { id: 2, documentId: "22", imageID: "event2_image2" },
    ],
    "Recent Event 3": [
      { id: 1, documentId: "31", imageID: "event3_image1" },
      { id: 2, documentId: "32", imageID: "event3_image2" },
    ],
    "Recent Event 4": [
      { id: 1, documentId: "41", imageID: "event4_image1" },
      { id: 2, documentId: "42", imageID: "event4_image2" },
    ],
  });
  const [recentEventsRefs, setRecentEventsRefs] = useState({
    "Recent Event 1": "recentEvents1",
    "Recent Event 2": "recentEvents2",
    "Recent Event 3": "recentEvents3",
    "Recent Event 4": "recentEvents4"
  })
  const handleEventChange = (event) => {
    setSelectedEvent(event);
  };
  const [recentToysData, setRecentToysData] = useState([
    {
      id: 1,
      documentId: "airplane",
      description: "Up, up and away we go! This plane lights up and moves at the push of a button!",
      name: "Airplane",
      imageID: "1B3L40nGH9ySizfE_NkBl_vQj8fdY0Nhl",
      altText: "Modified Airplane Toy",
      buildURL:
        "https://docs.google.com/presentation/d/1sG6zYR71rNoACMY5j51roubwaqilKjNm_EgJfxFn7VU/edit#slide=id.p",
    },
    {
      id: 2,
      documentId: "bus",
      description: "Want to see the bus go round and round? With this toy, you can! At the push of a button, this school bus will DRIVE!",
      name: "School Bus",
      imageID: "1lg24yPkPHhcp5G3oXpu54riojgWebgQW",
      altText: "Modified Bus Toy",
      buildURL: "",
    },
  ]);
  const [oldToysData, setOldToysData] = useState([
    {
      id: 1,
      documentId: "alien",
      description: "temp description",
      name: "Alien",
      imageID: "1Mnn9Yn-CQRAtSQ-xBBad3-6vyIMtxeFE",
      altText: "Modified Alien Toy",
      buildURL: "",
    },
    {
      id: 2,
      documentId: "dog",
      description: "temp description",
      name: "Dog",
      imageID: "18qJcQ0HD36rQHOCP41r7fvAe78D-XxHz",
      altText: "Modified Dog Toy",
      buildUrl: "",
    },
  ]);
  const [donationsData, setDonationsData] = useState([
    {
      id: 1,
      documentId: "Aversboro Elementary School",
      imageID: "1Y0HTYgreITQunWmhzlCuEYwz149zvvLl",
      orgName: "Aversboro Elementary School",
      totalDonated: 10,
      numDonations: 1,
      description: "",
    },
    {
      id: 2,
      documentId: "Levine Children's Hospital",
      imageID: "10uFPO5F8QR44Zoqjm3wiF-UaWRFwvZO5",
      orgName: "Levine Children's Hospital",
      totalDonated: 32,
      numDonations: 2,
      description: "levine description",
    },
  ]);
  const [mediaData, setMediaData] = useState([
    {
      id: 1,
      documentId: "AaGzXdI3bZmwRnaJS5Dp",
      imageID: "MediaCoverage_1.jpg",
      alt: "UNC students presenting the toys they made to the children.",
      title: "It's a rewarding experience': Children with disabilities get toys modified for them by UNC students",
      caption: "The students work all year holding bake sales and community benefit nights to make the money to buy the toys.",
      link: "https://abc11.com/children-disabilities-toys-modified-unc-engineer-students/12602887/",
    },
    {
      id: 2,
      documentId: "L91Cm4SkCbs8827QReOt",
      imageID: "MediaCoverage_2.jpg",
      alt: "Student in the process of making and testing a toy.",
      title: "Making more accessible toys | UNC-Chapel Hill",
      caption: "The Tar Heels behind the CATCH student organization modify toys for children with disabilities and donate them to local medical facilities for children who need them.",
      link: "https://www.unc.edu/discover/making-more-accessible-toys/",
    },
  ]);

  const [prevData, setPrevData] = useState(execData);

  function logout() {
    console.log("This is where I would put a logout method if I had one");
  }

  function change_tab(tab) {
    switch (currTab) {
      case "Executives":
        setExecData(prevData);
        break;
      case "Main Slideshow":
        setSlideshowData(prevData);
        break;
      case "Recent Events":
        setRecentEventsData(prevData);
        break;
      case "Recent Toys":
        setRecentToysData(prevData);
        break;
      case "Old Toys":
        setOldToysData(prevData);
        break;
      case "Donations":
        setDonationsData(prevData);
        break;
      case "Media":
        setMediaData(prevData);
        break;
      default:
        console.log(tab + " is not mapped to a dataset in change_tab()");
    }
    
    setCurrTab(tab);
    setDropdownOpen(false);
    setDeletedIds([]);
    setAddedIds([]);
    setEditedIds([]);

    switch (tab) {
      case "Executives":
        setPrevData(execData);
        break;
      case "Main Slideshow":
        setPrevData(slideshowData);
        break;
      case "Recent Events":
        setPrevData(recentEventsData);
        break;
      case "Recent Toys":
        setPrevData(recentToysData);
        break;
      case "Old Toys":
        setPrevData(oldToysData);
        break;
      case "Donations":
        setPrevData(donationsData);
        break;
      case "Media":
        setPrevData(mediaData);
        break;
      default:
        console.log(tab + " is not mapped to a dataset in change_tab()");
    }
  }

  function Tab({ tabName }) {
    if (tabName === currTab) {
      return <div className="menu-button-current">{tabName}</div>;
    } else {
      return (
        <div className="menu-button" onClick={() => change_tab(tabName)}>
          {tabName}
        </div>
      );
    }
  }

  const handleEdit = (index, data, setEditIndex, setEditedData) => {
    setEditIndex(index);
    setEditedData({ ...data[index] });
  };

  const handleCancel = (setEditIndex) => {
    setEditIndex(null);
  };

  const handleInputChange = (field, value, setEditedData) => {
    setEditedData((prevData) => ({ ...prevData, [field]: value }));
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  function Table(props) {
    const initial_state = props.initial_state;
    const data = props.data;
    const setData = props.setData;
    const headers = props.headers;
    const dataRef = props.dataRef;

    const [editIndex, setEditIndex] = useState(null);
    const [editedData, setEditedData] = useState(initial_state);
    const init_keys = Object.keys(initial_state);

    const handleAddInit = () => {
      setEditIndex("plus");
      setEditedData(initial_state);
    };

    const handleChange = (field, value) => {
      return handleInputChange(field, value, setEditedData);
    };

    const handleSave = (ind) => {
      const editRow = {...data[ind]};
      const editId = editRow.documentId;
      if (editId === "" || (!addedIds.some(value => {return value === editId}) && !editedIds.some(value => {return value === editId}))) {
        setEditedIds([...editedIds, editId]);
      }

      const newData = [...data];
      newData[ind] = editedData;
      setData(newData);
      setEditIndex(null);
    };
  
    const handleDelete = (ind) => {
      const deleteRow = {...data[ind]};
      const deleteId = deleteRow.documentId;
      let idInd = -1;
      if (addedIds.some((value, index) => {idInd = index; return value === deleteId})) {
        const newAddedIds = [...addedIds]
        newAddedIds.splice(idInd, 1);
        setAddedIds(newAddedIds);
      } else if (editedIds.some((value, index) => {idInd = index; return value === deleteId})) {
        const newEditedIds = [...editedIds]
        newEditedIds.splice(idInd, 1);
        setEditedIds(newEditedIds);
        setDeletedIds([...deletedIds, deleteId]);
      } else {
        setDeletedIds([...deletedIds, deleteId]);
      }

      const newData = [...data];
      newData.splice(ind, 1);
      setData(newData);
    };
  
    const handleAdd = () => {
      const addId = data[data.length - 1].id + 1;
      let addDocId = "";
      if (currTab === "Donations") {
        addDocId = editedData.orgName;
      } else if (currTab === "Executives") {
        addDocId = editedData.position;
        addDocId = addDocId.replace(/\s+/g, '');
        addDocId = addDocId.charAt(0).toLowerCase() + addDocId.slice(1);
      } else if (currTab === "Recent Toys" || currTab === "Old Toys") {
        addDocId = editedData.name;
        addDocId = addDocId.replace(/\s+/g, '').toLowerCase();
      }

      if (addDocId !== "") {
        setAddedIds([...addedIds, addDocId]);
      }

      const newData = [...data, {...editedData, id: addId, documentId: addDocId}];
      setData(newData);
      setEditIndex(null);
    };

    const findDoc = (docId) => {
      const docu = data.find(object => {return object.documentId === docId});
      let newDoc = {...docu};
      delete newDoc.documentId;
      return newDoc;
    };

    const setInfo = async () => {
        for (const id in deletedIds) {
          await deleteDoc(doc(db, dataRef, deletedIds[id]))
        }
        setDeletedIds([]);
        
        if (currTab === "Media" || currTab === "Main Slideshow") {
          const newRows = data.filter(object => {return object.documentId === ""})
          for (const id in newRows) {
            let newDoc = {...newRows[id]}
            delete newDoc.documentId;
            if (currTab !== "Media") {
              delete newDoc.id;
            }
            await addDoc(collection(db, dataRef), newDoc);
          }
        } else if (currTab === "Recent Toys" || currTab === "Old Toys") {
          for (const id in addedIds) {
            const newDoc = {...findDoc(addedIds[id]), 
              current: currTab === "Recent Toys", 
              donated: 0, 
              imageName: "",  // Add this field to the Admin dashboard?
              inventory: 0, 
              ordered: 0
            };
            delete newDoc.id;
            await setDoc(doc(db, dataRef, addedIds[id]), newDoc);
          }
          setAddedIds([]);
        } else {
          for (const id in addedIds) {
            const newDoc = findDoc(addedIds[id]);
            if (currTab !== "Executives") {
              delete newDoc.id;
            }
            await setDoc(doc(db, dataRef, addedIds[id]), newDoc);
          }
          setAddedIds([]);
        }

        for (const id in editedIds) {
          const newDoc = findDoc(editedIds[id]);
          if (currTab !== "Media" && currTab !== "Executives") {
            delete newDoc.id;
          }
          await updateDoc(doc(db, dataRef, editedIds[id]), newDoc);
        }
        setEditedIds([]);

        // TODO: Fetch current data from firestore and call setData().
        //   Alternatively, when adding files to Media/Main Slideshow, update the documentId to match.
        setPrevData(data);
    }

    return (
      <div className="table-container">
        <table className="view-table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.id}>
                {init_keys.map((field) => (
                  <td key={field} className="wrap-cell">
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={editedData[field]}
                        onChange={(e) => handleChange(field, e.target.value)}
                      />
                    ) : (
                      row[field]
                    )}
                  </td>
                ))}
                <td>
                  {editIndex === index ? (
                    <>
                      <button
                        onClick={() =>
                          handleSave(
                            index,
                            data,
                            editedData,
                            setData,
                            setEditIndex
                          )
                        }
                        className="view-button"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => handleCancel(setEditIndex)}
                        className="view-button"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          handleEdit(index, data, setEditIndex, setEditedData)
                        }
                        className="view-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index, data, setData)}
                        className="view-button"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {editIndex === "plus" ? (
              <tr>
                {init_keys.map((field) => (
                  <td key={field}>
                    <input
                      type="text"
                      value={editedData[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                    />
                  </td>
                ))}
                <td>
                  <>
                    <button
                      onClick={() =>
                        handleAdd(data, editedData, setData, setEditIndex)
                      }
                      className="view-button"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => handleCancel(setEditIndex)}
                      className="view-button"
                    >
                      Cancel
                    </button>
                  </>
                </td>
              </tr>
            ) : (
              <tr>
                <td>
                  <button onClick={handleAddInit} className="add-button">
                    +
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="save-div">
          <button onClick={setInfo} className="save-button">
            Save Changes
          </button>
        </div>
      </div>
    );
  }

  function TableRecentEvents({
    initial_state,
    data,
    setData,
    headers,
    selectedEvent,
  }) {
    const [editIndex, setEditIndex] = useState(null);
    const [editedData, setEditedData] = useState(initial_state);

    const handleAddInit = () => {
      setEditIndex("plus");
      setEditedData(initial_state);
    };

    const handleChange = (field, value) => {
      return handleInputChange(field, value, setEditedData);
    };

    const handleSave = (index) => {
      const newData = [...data];
      newData[index] = editedData;
      setData((prevData) => ({ ...prevData, [selectedEvent]: newData }));
      setEditIndex(null);
    };

    const handleDelete = (index) => {
      const newData = [...data];
      newData.splice(index, 1);
      setData((prevData) => ({ ...prevData, [selectedEvent]: newData }));
    };

    const handleAdd = () => {
      const addId = data[data.length - 1].id + 1;
      const addDocId = "";

      const newData = [...data, {...editedData, id: addId, documentId: addDocId}];
      setData((prevData) => ({ ...prevData, [selectedEvent]: newData }));
      setEditIndex(null);
    };

    const findDoc = (docId) => {
      const docu = data.find(object => {return object.documentId === docId});
      let newDoc = {...docu};
      delete newDoc.id;
      delete newDoc.documentId;
      return newDoc;
    };

    const setInfo = async () => {
      const dataRef = recentEventsRefs[selectedEvent];
      for (const id in deletedIds) {
        await deleteDoc(doc(db, dataRef, deletedIds[id]))
      }
      setDeletedIds([]);
      
      const newRows = data.filter(object => {return object.documentId === ""})
      for (const id in newRows) {
        let newDoc = {...newRows[id]}
        delete newDoc.documentId;
        delete newDoc.id;
        await addDoc(collection(db, dataRef), newDoc);
      }

      for (const id in editedIds) {
        const newDoc = findDoc(editedIds[id]);
        await updateDoc(doc(db, dataRef, editedIds[id]), newDoc);
      }
      setEditedIds([]);

      // TODO: Fetch current data from firestore and call setData().
      //   Alternatively, when adding files, update the documentId to match.
      setPrevData(data);
    }

    return (
      <div>
        <table className="view-table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.id}>
                {Object.keys(initial_state).map((field) => (
                  <td key={field}>
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={editedData[field]}
                        onChange={(e) => handleChange(field, e.target.value)}
                      />
                    ) : (
                      row[field]
                    )}
                  </td>
                ))}
                <td>
                  {editIndex === index ? (
                    <>
                      <button
                        onClick={() => handleSave(index)}
                        className="view-button"
                      >
                        Save
                      </button>
                      <button onClick={() => handleCancel(setEditIndex)} className="view-button">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(index, data, setEditIndex, setEditedData)}
                        className="view-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="view-button"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {editIndex === "plus" ? (
              <tr>
                {Object.keys(initial_state).map((field) => (
                  <td key={field}>
                    <input
                      type="text"
                      value={editedData[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                    />
                  </td>
                ))}
                <td>
                  <>
                    <button onClick={handleAdd} className="view-button">
                      Add
                    </button>
                    <button onClick={handleCancel} className="view-button">
                      Cancel
                    </button>
                  </>
                </td>
              </tr>
            ) : (
              <tr>
                <td>
                  <button onClick={handleAddInit} className="add-button">
                    +
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="save-div">
        <button onClick={setInfo} className="save-button">
          Save Changes
        </button>
        </div>
      </div>
    );
  }

  function RightView() {
    // Note: May have to delete the initializeVals() function and manually create the initial_state in each tab, e.g. headers
    const initializeVals = (obj) => {
      let newObj = { ...obj };
      delete newObj.id;
      delete newObj.documentId;
      for (const field of Object.keys(newObj)) {
        if (typeof obj[field] === "string") {
          newObj[field] = "";
        } else if (typeof obj[field] === "number") {
          newObj[field] = 0;
        } else {
          newObj[field] = null;
        }
      }
      return newObj;
    };

    switch (currTab) {
      case "Executives":
        const execInit = initializeVals(execData[0]);
        const execHeaders = ["Name", "Position", "Image ID (Google Drive)"];
        return (
          <Table
            initial_state={execInit}
            data={execData}
            setData={setExecData}
            headers={execHeaders}
            dataRef={execRef}
          />
        );
      case "Main Slideshow":
        const slideInit = initializeVals(slideshowData[0]);
        const slideHeaders = ["Image ID (Google Drive)"];
        return (
          <Table
            initial_state={slideInit}
            data={slideshowData}
            setData={setSlideshowData}
            headers={slideHeaders}
            dataRef={slideshowRef}
          />
        );
      case "Recent Events":
        const recentEventsInit = initializeVals({imageID: "" });
        const recentEventsHeaders = ["Image ID (Google Drive)"];

        return (
          <div>
            <div class="event-selector">
              <select
                class="event-selector-select"
                id="eventSelector"
                value={selectedEvent}
                onChange={(e) => handleEventChange(e.target.value)}
              >
                {recentEvents.map((event) => (
                  <option key={event} value={event}>
                    {event}
                  </option>
                ))}
              </select>
              <br></br>
              <h3 class="selected-event-name">{selectedEvent}</h3>
            </div>
            <TableRecentEvents
              initial_state={recentEventsInit}
              data={recentEventsData[selectedEvent]}
              setData={setRecentEventsData}
              headers={recentEventsHeaders}
              selectedEvent={selectedEvent}
            />
          </div>
        );
      case "Recent Toys":
        const recentToysInit = initializeVals(recentToysData[0]);
        const recentToysHeaders = [
          "Description",
          "Name",
          "Image ID (Google Drive)",
          "Alternate Text",
          "Build URL",
        ];
        return (
          <Table
            initial_state={recentToysInit}
            data={recentToysData}
            setData={setRecentToysData}
            headers={recentToysHeaders}
            dataRef={toysRef}
          />
        );
      case "Old Toys":
        const oldToysInit = initializeVals(oldToysData[0]);
        const oldToysHeaders = [
          "Description",
          "Name",
          "Image ID (Google Drive)",
          "Alternate Text",
          "Build URL",
        ];
        return (
          <Table
            initial_state={oldToysInit}
            data={oldToysData}
            setData={setOldToysData}
            headers={oldToysHeaders}
            dataRef={toysRef}
          />
        );
      case "Donations":
        const donationsInit = initializeVals(donationsData[0]);
        const donationsHeaders = [
          "Image ID (Google Drive)",
          "Organization",
          "Total Donations",
          "Number of Donations",
          "Description",
        ];
        return (
          <Table
            initial_state={donationsInit}
            data={donationsData}
            setData={setDonationsData}
            headers={donationsHeaders}
            dataRef={donationsRef}
          />
        );
      case "Media":
        const mediaInit = initializeVals(mediaData[0]);
        const mediaHeaders = [
          "Image ID (Google Drive)",
          "Alternate Text",
          "Header",
          "Description",
          "Article URL",
        ];
        return (
          <Table
            initial_state={mediaInit}
            data={mediaData}
            setData={setMediaData}
            headers={mediaHeaders}
            dataRef={mediaRef}
          />
        );
      default:
        return <p>Valid Tab Name not found</p>;
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

      <div className="mobile-tabs">
        <div className="title">Dashboard</div>
        <button className="dropdown-button" onClick={toggleDropdown}>
          {currTab} <FaChevronCircleDown></FaChevronCircleDown>{" "}
        </button>
        {isDropdownOpen && (
          <div>
            <Tab tabName="Executives" />
            <Tab tabName="Main Slideshow" />
            <Tab tabName="Recent Events" />
            <Tab tabName="Recent Toys" />
            <Tab tabName="Old Toys" />
            <Tab tabName="Donations" />
            <Tab tabName="Media" />
          </div>
        )}
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
  );
}
