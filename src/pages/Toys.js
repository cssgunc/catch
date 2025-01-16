import React, { useState, useEffect } from "react";
import { FaHammer, FaPlus, FaChevronLeft } from "react-icons/fa";
import { getDynamicRecentToys } from "../components/toyInfo";
import Banner from "../components/Banner";
import "./Toys.css";

function ToyPage(props) {
  const url = props.details.buildURL;
  const recent = props.details.current;
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    props.setViewToy(false);
    props.setActiveToy(false);
    document.body.style.overflow = "auto";
  };

  const handleBuildRedirect = () => {
    if (url === "N/A") {
      return;
    }
    window.open(url, "_blank");
  };

  function addToyPage(setOrder, order, details) {
    props.addToy(setOrder, order, details);
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 250);
  }

  return (
    <>
      <div className="toy-container">
        <button className="back-button" onClick={() => handleClick()}>
          <FaChevronLeft size={40} />
        </button>
        <div className="toy-details">
          <img
            src={props.details.imagePath}
            className="main-picture"
            alt=""
          ></img>
          <div className="toy-text">
            <div className="toy-descriptors">
              <h1 className="toy-title">{props.details.name}</h1>
              <br />
              <p className="toy-description">{props.details.description}</p>
            </div>
            <div className="toy-buttons">
              <div className="button-break" />
              {recent === true && (
                <button
                  className={`add-to-cart-button ${isClicked ? "clicked" : ""}`}
                  onClick={() =>
                    addToyPage(props.setOrder, props.order, props.details)
                  }
                >
                  <div className="button-holder">
                    <FaPlus size={15} style={{ marginRight: "10px" }} />{" "}
                    <span>Add to Cart</span>
                  </div>
                </button>
              )}
              {url !== "N/A" && (
                <button
                  className="build-button"
                  onClick={() => handleBuildRedirect()}
                >
                  <div className="button-holder">
                    <FaHammer size={20} style={{ marginRight: "10px" }} />{" "}
                    <span>Make Yourself</span>
                  </div>
                </button>
              )}
              <div className="button-break" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Toy(props) {
  const [activeToy, setActiveToy] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    if (props.isNew) {
      props.setViewToy(true);
      setActiveToy(true);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
      document.body.style.overflow = "hidden";
    }
  };

  function addToyToCart(setOrder, order, details) {
    setIsClicked(true);

    // Reset the button state after a short delay (you can adjust the delay as needed)
    setTimeout(() => {
      setIsClicked(false);
    }, 350);
    let tempOrder = [...order];
    for (let i = 0; i < tempOrder.length; i++) {
      if (tempOrder[i].name === props.details.name) {
        tempOrder[i].quantity++;
        props.setOrder(tempOrder);
        return;
      }
    }
    tempOrder.push({
      name: props.details.name,
      quantity: 1,
      imagePath: props.details.imagePath,
      description: props.details.description,
    });
    props.setOrder(tempOrder);
  }

  return (
    <>
      {!props.viewToy && (
        <div className="image-tile">
          <img
            onClick={() => handleClick()}
            src={props.details.imagePath}
            alt={props.details.altText}
            className={props.isNew ? "catalog-picture" : "catalog-picture-old"}
          />
          {props.isNew && (
            <button
              className={`plus-toy ${isClicked ? "clicked" : ""}`}
              onClick={() =>
                addToyToCart(props.setOrder, props.order, props.details)
              }
            >
              <div className='plus-icon'>
              <FaPlus
                size={18}
              />
              </div>
            </button>
          )}
        </div>
      )}
      {props.viewToy && activeToy && (
        <ToyPage
          details={props.details}
          setViewToy={props.setViewToy}
          setActiveToy={setActiveToy}
          addToy={addToyToCart}
          setOrder={props.setOrder}
          order={props.order}
        />
      )}
    </>
  );
}

function ToyGridNew(props) {
  const [recentToys, setRecentToys] = useState([]);

  useEffect(() => {
    const fetchToys = async () => {
      const toyData = await getDynamicRecentToys();
      setRecentToys(toyData);
    };

    fetchToys();
  }, []);

  const recentToysString = JSON.stringify(recentToys);
  localStorage.setItem("recentToys", recentToysString);

  return (
    <div id="catalog">
      {recentToys.map((toy) => (
        <Toy
          details={toy}
          viewToy={props.viewToy}
          setViewToy={props.setViewToy}
          order={props.order}
          setOrder={props.setOrder}
          isNew={true}
        />
      ))}
    </div>
  );
}

export default function Toys(props) {
  const [viewToy, setViewToy] = useState(false);
  return (
    <>
      {!viewToy && (
        <Banner
          imagePath="banner/toy_catalog_banner_color.png"
          title="Toy Catalog"
        />
      )}

      {!viewToy && <h2 style={{ paddingTop: "50px" }}>Current Toys</h2>}

      {!viewToy && (
        <p id="catalog-subtitle">Click the photos for more information</p>
      )}

      <ToyGridNew
        order={props.order}
        setOrder={props.setOrder}
        viewToy={viewToy}
        setViewToy={setViewToy}
      />

      <div className="pat">
        <h2 className="pat-title">Project Assistive Tech</h2>
        <p>
          Project Assistive Tech (PAT) was born in December 2022 through our
          collaboration with Atrium Health. With their generous donation, we
          were able to obtain CATCH’s first 3D printer. Since then, we have
          donated 50+ pieces of 3D printed assistive technology (ie. deodorant
          holders, zipper pulls, toothpaste squeezers, braille learning symbols)
          to various patients across Atrium Health, CIDD, and CRC. We have also
          obtained a second 3D printer!
        </p>
        <br />
        <p>
          This semester, we are expanding/rethinking PAT through a (pilot)
          learning initiative. Through PAT classes, our members can advance
          their CAD, circuit design, surface mount soldering, and web
          development skills. The informal course will culminate in a final
          project where members can showcase their skills with an assistive tech
          project!
        </p>
        <a href="https://forms.gle/AahiawRsYETf1Wdx6">Learn more</a>

        <div className="pat-images">
          <img
            src="project_assistive_tech/pat1.png"
            id="pat1"
            alt="pat 1"
          ></img>
          <div className="pat-images-col">
            <img
              src="project_assistive_tech/pat2.png"
              id="pat2"
              alt="pat 2"
            ></img>
            <img
              src="project_assistive_tech/pat3.png"
              id="pat3"
              alt="pat 3"
            ></img>
          </div>
          <img
            src="project_assistive_tech/pat4.png"
            id="pat4"
            alt="pat 4"
          ></img>
        </div>
      </div>

      {!viewToy && (
        <img src="logo.png" className="catch-logo" alt="CATCH Logo" />
      )}
      <p>Photo credits: Hieu Doan</p>
    </>
  );
}
