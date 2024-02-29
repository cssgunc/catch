import React, { useState } from "react";
//import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import { FiLogOut } from "react-icons/fi";
import { auth, db } from "../firebase-config.js";
import Login from "./Login.js";

import { signOut } from "firebase/auth";

import { FaChevronCircleDown } from "react-icons/fa";
import "./Admin.css";

export default function Admin() {
  const toysUpdateRef = doc(db, "lastUpdated", "toysLastUpdated");
  const donateSumRef = doc(db, "totalDonated", "totalDonated");
  const currUserName = "Admin";

  function logout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
    window.location.reload(false);
  }

  const [currTab, setCurrTab] = useState("Executives");

  const [deletedIds, setDeletedIds] = useState([]);
  const [addedIds, setAddedIds] = useState([]);
  const [editedIds, setEditedIds] = useState([]);

  const tabRefs = {
    Executives: "exec",
    "Main Slideshow": "mainSlideshow",
    "Recent Toys": "toys",
    "Old Toys": "toys",
    Donations: "donations",
    Media: "media",
  };

  const recentEvents = [
    "Recent Event 1",
    "Recent Event 2",
    "Recent Event 3",
    "Recent Event 4",
  ];

  const [selectedEvent, setSelectedEvent] = useState(recentEvents[0]);

  const recentEventsRefs = {
    "Recent Event 1": "recentEvents1",
    "Recent Event 2": "recentEvents2",
    "Recent Event 3": "recentEvents3",
    "Recent Event 4": "recentEvents4",
  };

  const handleEventChange = (event) => {
    setSelectedEvent(event);
    getData(recentEventsRefs[event], "Recent Events");
  };

  const [currData, setCurrData] = useState([]);

  async function getData(currRef, tab) {
    let q = collection(db, currRef);
    if (tab === "Recent Toys" || tab === "Old Toys") {
      q = query(
        collection(db, currRef),
        where("current", "==", tab === "Recent Toys")
      );
    } else if (tab === "Executives" || tab === "Media") {
      q = query(collection(db, currRef), orderBy("id"));
    }

    let newData = [];

    try {
      const docsSnap = await getDocs(q);
      let idNum = 1;
      switch (tab) {
        case "Executives":
          docsSnap.forEach((doc) => {
            newData = [
              ...newData,
              {
                id: doc.get("id"),
                documentId: doc.id,
                name: doc.get("name"),
                position: doc.get("position"),
                imageID: doc.get("imageID"),
              },
            ];
          });
          break;
        case "Main Slideshow":
          docsSnap.forEach((doc) => {
            newData = [
              ...newData,
              { id: idNum, documentId: doc.id, imageID: doc.get("imageID") },
            ];
            idNum++;
          });
          break;
        case "Recent Events":
          docsSnap.forEach((doc) => {
            newData = [
              ...newData,
              { id: idNum, documentId: doc.id, imageID: doc.get("imageID") },
            ];
            idNum++;
          });
          break;
        case "Recent Toys":
          docsSnap.forEach((doc) => {
            newData = [
              ...newData,
              {
                id: idNum,
                documentId: doc.id,
                description: doc.get("description"),
                name: doc.get("name"),
                imageID: doc.get("imageID"),
                altText: doc.get("altText"),
                buildURL: doc.get("buildURL"),
              },
            ];
            idNum++;
          });
          break;
        case "Old Toys":
          docsSnap.forEach((doc) => {
            newData = [
              ...newData,
              {
                id: idNum,
                documentId: doc.id,
                description: doc.get("description"),
                name: doc.get("name"),
                imageID: doc.get("imageID"),
                altText: doc.get("altText"),
                buildURL: doc.get("buildURL"),
              },
            ];
            idNum++;
          });
          break;
        case "Donations":
          docsSnap.forEach((doc) => {
            newData = [
              ...newData,
              {
                id: idNum,
                documentId: doc.id,
                imageID: doc.get("imageID"),
                orgName: doc.get("orgName"),
                totalDonated: doc.get("totalDonated"),
                numDonations: doc.get("numDonations"),
                description: doc.get("description"),
              },
            ];
            idNum++;
          });
          break;
        case "Media":
          docsSnap.forEach((doc) => {
            newData = [
              ...newData,
              {
                id: doc.get("id"),
                documentId: doc.id,
                imageID: doc.get("imageID"),
                alt: doc.get("alt"),
                title: doc.get("title"),
                caption: doc.get("caption"),
                link: doc.get("link"),
              },
            ];
          });
          break;
        default:
          console.log(
            currTab + " is not mapped to a document pattern in setData()"
          );
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }


    setCurrData(newData);
    setCurrTab(tab);
  }

  const [firstRender, setFirstRender] = useState(false);

  if (firstRender === false) {
    setFirstRender(true);
    getData(tabRefs[currTab], currTab);
  }

  async function change_tab(tab) {
    setDropdownOpen(false);
    setDeletedIds([]);
    setAddedIds([]);
    setEditedIds([]);

    let ref = null;
    if (tab === "Recent Events") {
      ref = recentEventsRefs[selectedEvent];
    } else {
      ref = tabRefs[tab];
    }
    getData(ref, tab);
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

  function Table({ initial_state, data, setData, headers, dataRef }) {
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
      const editRow = { ...data[ind] };
      const editId = editRow.documentId;
      if (
        editId !== "" &&
        !addedIds.some((value) => {
          return value === editId;
        }) &&
        !editedIds.some((value) => {
          return value === editId;
        })
      ) {
        setEditedIds([...editedIds, editId]);
      }

      const newData = [...data];
      newData[ind] = editedData;
      setData(newData);
      setEditIndex(null);
    };

    const handleDelete = (ind) => {
      const deleteRow = { ...data[ind] };
      const deleteId = deleteRow.documentId;
      let idInd = -1;
      if (
        addedIds.some((value, index) => {
          idInd = index;
          return value === deleteId;
        })
      ) {
        const newAddedIds = [...addedIds];
        newAddedIds.splice(idInd, 1);
        setAddedIds(newAddedIds);
      } else if (
        editedIds.some((value, index) => {
          idInd = index;
          return value === deleteId;
        })
      ) {
        const newEditedIds = [...editedIds];
        newEditedIds.splice(idInd, 1);
        setEditedIds(newEditedIds);
        setDeletedIds([...deletedIds, deleteId]);
      } else if (deleteId !== "") {
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
        addDocId = addDocId.replace(/\s+/g, "");
        addDocId = addDocId.charAt(0).toLowerCase() + addDocId.slice(1);
      } else if (currTab === "Recent Toys" || currTab === "Old Toys") {
        addDocId = editedData.name;
        addDocId = addDocId.replace(/\s+/g, "").toLowerCase();
      }

      if (addDocId !== "") {
        setAddedIds([...addedIds, addDocId]);
      }

      const newData = [
        ...data,
        { ...editedData, id: addId, documentId: addDocId },
      ];
      setData(newData);
      setEditIndex(null);
    };

    const findDoc = (docId) => {
      const docu = data.find((object) => {
        return object.documentId === docId;
      });
      let newDoc = { ...docu };
      delete newDoc.documentId;
      return newDoc;
    };

    const setInfo = async () => {
      let changes = false;

      try {
        for (const id in deletedIds) {
          await deleteDoc(doc(db, dataRef, deletedIds[id]));
        }
        if (deletedIds.length !== 0) {
          changes = true;
        }
        setDeletedIds([]);
      } catch (error) {
        console.error("Error deleting documents", error);
      }

      try {
        if (currTab === "Media" || currTab === "Main Slideshow") {
          const newRows = data.filter((object) => {
            return object.documentId === "";
          });
          for (const id in newRows) {
            let newDoc = { ...newRows[id] };
            delete newDoc.documentId;
            if (currTab !== "Media") {
              delete newDoc.id;
            }
            await addDoc(collection(db, dataRef), newDoc);
          }
          if (newRows.length !== 0) {
            changes = true;
          }
        } else if (currTab === "Recent Toys" || currTab === "Old Toys") {
          for (const id in addedIds) {
            const newDoc = {
              ...findDoc(addedIds[id]),
              current: currTab === "Recent Toys", // Allow this field to be edited?
              donated: 0,
              imageName: "", // Add this field to the Admin dashboard?
              inventory: 0,
              ordered: 0,
            };
            delete newDoc.id;
            await setDoc(doc(db, dataRef, addedIds[id]), newDoc);
          }
          if (addedIds.length !== 0) {
            changes = true;
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
          if (addedIds.length !== 0) {
            changes = true;
          }
          setAddedIds([]);
        }
      } catch (error) {
        console.error("Error adding documents", error);
      }

      try {
        for (const id in editedIds) {
          const newDoc = findDoc(editedIds[id]);
          if (currTab !== "Media" && currTab !== "Executives") {
            delete newDoc.id;
          }
          await updateDoc(doc(db, dataRef, editedIds[id]), newDoc);
        }
        if (editedIds.length !== 0) {
          changes = true;
        }
        setEditedIds([]);
      } catch (error) {
        console.error("Error editing documents", error);
      }

      // Development note: If adding/altering dummy data with Recent Toys or Old Toys, comment out the following if statement.
      // if ((currTab === "Recent Toys" || currTab === "Old Toys") && changes) {
      //   updateDoc(doc(db, "lastUpdated", "toysLastUpdated"), {toysLastUpdated: serverTimestamp()});
      // }

      // TODO: Add visual indication of result (success/failure)
      // TODO: consider alternative setup to prevent failure's resulting progress erasure:
      //    If success, getData()
      //    Else, record current progress for resubmission (if mid-deletedIds, addedIds, editedIds) and disallow further alterations until setInfo() is fully executed

      getData(dataRef, currTab);
    };

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
    selectedEventRef,
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
      const editRow = { ...data[index] };
      const editId = editRow.documentId;
      if (
        editId !== "" &&
        !editedIds.some((value) => {
          return value === editId;
        })
      ) {
        setEditedIds([...editedIds, editId]);
      }

      const newData = [...data];
      newData[index] = editedData;
      setData(newData);
      setEditIndex(null);
    };

    const handleDelete = (index) => {
      const deleteRow = { ...data[index] };
      const deleteId = deleteRow.documentId;
      let idInd = -1;
      if (
        editedIds.some((value, index) => {
          idInd = index;
          return value === deleteId;
        })
      ) {
        const newEditedIds = [...editedIds];
        newEditedIds.splice(idInd, 1);
        setEditedIds(newEditedIds);
      }

      if (deleteId !== "") {
        setDeletedIds([...deletedIds, deleteId]);
      }

      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    };

    const handleAdd = () => {
      const addId = data[data.length - 1].id + 1;
      const addDocId = "";

      const newData = [
        ...data,
        { ...editedData, id: addId, documentId: addDocId },
      ];
      setData(newData);
      setEditIndex(null);
    };

    const findDoc = (docId) => {
      const docu = data.find((object) => {
        return object.documentId === docId;
      });
      let newDoc = { ...docu };
      delete newDoc.id;
      delete newDoc.documentId;
      return newDoc;
    };

    const setInfo = async () => {
      try {
        for (const id in deletedIds) {
          await deleteDoc(doc(db, selectedEventRef, deletedIds[id]));
        }
        setDeletedIds([]);
      } catch (error) {
        console.error("Error deleting documents", error);
      }

      try {
        const newRows = data.filter((object) => {
          return object.documentId === "";
        });
        for (const id in newRows) {
          let newDoc = { ...newRows[id] };
          delete newDoc.documentId;
          delete newDoc.id;
          await addDoc(collection(db, selectedEventRef), newDoc);
        }
      } catch (error) {
        console.error("Error adding documents", error);
      }

      try {
        for (const id in editedIds) {
          const newDoc = findDoc(editedIds[id]);
          await updateDoc(doc(db, selectedEventRef, editedIds[id]), newDoc);
        }
        setEditedIds([]);
      } catch (error) {
        console.error("Error editing documents", error);
      }

      // TODO: Add visual indication of result (success/failure)
      // TODO: consider alternative setup to prevent failure's resulting progress erasure:
      //    If success, getData()
      //    Else, record current progress for resubmission (if mid-deletedIds, adding ids, editedIds) and disallow further alterations until setInfo() is fully executed

      getData(selectedEventRef, "Recent Events");
    };

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
    switch (currTab) {
      case "Executives":
        const execInit = { name: "", position: "", imageID: "" };
        const execHeaders = ["Name", "Position", "Image ID (PNG/JPEG)"];
        return (
          <Table
            initial_state={execInit}
            data={currData}
            setData={setCurrData}
            headers={execHeaders}
            dataRef={tabRefs[currTab]}
          />
        );
      case "Main Slideshow":
        const slideInit = { imageID: "" };
        const slideHeaders = ["Image ID (PNG/JPEG)"];
        return (
          <Table
            initial_state={slideInit}
            data={currData}
            setData={setCurrData}
            headers={slideHeaders}
            dataRef={tabRefs[currTab]}
          />
        );
      case "Recent Events":
        const recentEventsInit = { imageID: "" };
        const recentEventsHeaders = ["Image ID (PNG/JPEG)"];

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
              data={currData}
              setData={setCurrData}
              headers={recentEventsHeaders}
              selectedEventRef={recentEventsRefs[selectedEvent]}
            />
          </div>
        );
      case "Recent Toys":
        const recentToysInit = {
          description: "",
          name: "",
          imageID: "",
          altText: "",
          buildURL: "",
        };
        const recentToysHeaders = [
          "Description",
          "Name",
          "Image ID (PNG/JPEG)",
          "Alternate Text",
          "Build URL",
        ];
        return (
          <Table
            initial_state={recentToysInit}
            data={currData}
            setData={setCurrData}
            headers={recentToysHeaders}
            dataRef={tabRefs[currTab]}
          />
        );
      case "Old Toys":
        const oldToysInit = {
          description: "",
          name: "",
          imageID: "",
          altText: "",
          buildURL: "",
        };
        const oldToysHeaders = [
          "Description",
          "Name",
          "Image ID (PNG/JPEG)",
          "Alternate Text",
          "Build URL",
        ];
        return (
          <Table
            initial_state={oldToysInit}
            data={currData}
            setData={setCurrData}
            headers={oldToysHeaders}
            dataRef={tabRefs[currTab]}
          />
        );
      case "Donations":
        const donationsInit = {
          imageID: "",
          orgName: "",
          totalDonated: 0,
          numDonations: "",
          description: "",
        };
        const donationsHeaders = [
          "Image ID (PNG/JPEG)",
          "Organization",
          "Total Donations",
          "Number of Donations",
          "Description",
        ];
        return (
          <Table
            initial_state={donationsInit}
            data={currData}
            setData={setCurrData}
            headers={donationsHeaders}
            dataRef={tabRefs[currTab]}
          />
        );
      case "Media":
        const mediaInit = {
          imageID: "",
          alt: "",
          title: "",
          caption: "",
          link: "",
        };
        const mediaHeaders = [
          "Image ID (PNG/JPEG)",
          "Alternate Text",
          "Header",
          "Description",
          "Article URL",
        ];
        return (
          <Table
            initial_state={mediaInit}
            data={currData}
            setData={setCurrData}
            headers={mediaHeaders}
            dataRef={tabRefs[currTab]}
          />
        );
      default:
        return <p>Valid Tab Name not found</p>;
    }
  }

  return (
    <div>
      {auth.currentUser ? (
        <div className="App">
          <div className="header">
            <div className="left">
              <b>CATCH Admin</b>
            </div>
            <div className="right">
              {currUserName}
              <FiLogOut
                onClick={logout}
                size={25}
                style={{
                  marginLeft: "10px",
                  marginTop: "-5px",
                  cursor: "pointer",
                }}
              />
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
      ) : (
        <Login />
      )}
    </div>
  );
}
