import React, { useState, useEffect } from "react";
import { FaHammer, FaPlus, FaChevronLeft } from "react-icons/fa";
import { getDynamicRecentToys, getDynamicOldToys} from "../components/toyInfo";
import Banner from "../components/Banner";
//import bannerImage from '../images/Toy Catolog/banner.jpg'
import bannerImage from '../images/Toy Catolog/toy_catolog_banner_color.jpeg'

import './Toys.css'

function ToyPage(props) {

  const url = props.details.buildURL;

  const handleClick = () => {
    props.setViewToy(false);
    props.setActiveToy(false);
  };

  const handleBuildRedirect = () => {
    if (url === ""){
      return;
    }
    window.location.href = url;
  }

  return(
    <>
    <div className='toy-container'>
      <button className="back-button" onClick={() => handleClick()}>
        <FaChevronLeft size={40}/>
      </button>
      <div className='toy-details'>
        <img src={props.details.imagePath} className='main-picture' alt=""></img>
        <div className="toy-text">
            <div className="toy-descriptors">
              <h1 className='toy-title'>{props.details.name}</h1>
              <br/>
              <h3 style={{font: "Montserrat", width:"100%", textAlign:"left"}}>Description</h3>
              <p className="toy-description">{props.details.description}</p>
            </div>
            <div className="toy-buttons">
              <div className="button-break"/>
              <button className="add-to-cart-button" onClick={() => props.addToy(props.setOrder, props.order, props.details)}>
                <div className="button-holder">
                  <FaPlus size={15} style={{marginRight:"10px"}}/> <span>Add to Cart</span>
                </div>
              </button>
              <button className="build-button" onClick={() =>handleBuildRedirect()}>
                <div className="button-holder">
                  <FaHammer size={20} style={{marginRight:"10px"}}/> <span>Make Yourself</span>
                </div>
              </button>
              <div className="button-break"/>
            </div>
        </div>
      </div>
    </div>
    </>
  );
}

function Toy(props) {
  const [activeToy, setActiveToy] = useState(false);
  const handleClick = () => {
    props.setViewToy(true);
    setActiveToy(true);
  };

  function addToyToCart(setOrder, order, details) {
    let tempOrder = [...order]
    for (let i = 0; i < tempOrder.length; i++) {
      if (tempOrder[i].name === props.details.name) {
        tempOrder[i].quantity++;
        props.setOrder(tempOrder);
        return;
      }
    }
    tempOrder.push({"name": props.details.name, "quantity": 1, "imagePath": props.details.imagePath, "description": props.details.description});
    props.setOrder(tempOrder);
  }

  return (
    <>
      {!props.viewToy && 
      <div className="image-tile">
        <img onClick={() => handleClick()} src={props.details.imagePath} alt={props.details.altText} className="catalog-picture"/>
        {props.isNew && <button className="plus-toy" onClick={() => addToyToCart(props.setOrder, props.order, props.details)}>
          <FaPlus size={18} style={{display:"flex", width:"100%", border:"transparent"}}/>
        </button>}
      </div>}
      {props.viewToy && activeToy &&
      <ToyPage 
        details={props.details}
        setViewToy={props.setViewToy}
        setActiveToy={setActiveToy}
        addToy={addToyToCart}
        setOrder={props.setOrder}
        order={props.order}
      />}
    </>
  );

}

function ToyGrid_new(props) {

  const [recentToys, setRecentToys] = useState([]);

  useEffect(() => {
    const fetchToys = async () => {
      const toyData = await getDynamicRecentToys();
      setRecentToys(toyData);
    };

    fetchToys();
  }, []);

  const recentToysString = JSON.stringify(recentToys);
  localStorage.setItem('recentToys', recentToysString);

  return (
    <div id="catalog">
      {recentToys.map((toy) => (
        <Toy
          details={toy}
          viewToy={props.viewToy}
          setViewToy={props.setViewToy}
          order={props.order}
          setOrder={props.setOrder}
          isNew = {true}
        />
      ))}
    </div>
  );
}


function ToyGrid_old(props) {

  const [oldToys, setOldToys] = useState([]);

  useEffect(() => {
    const fetchToys = async () => {
      const toyData = await getDynamicOldToys();
      setOldToys(toyData);
    };

    fetchToys();
  }, []);

  return (
    <div id="catalog">
      {oldToys.map((toy) => (
        <Toy
          details={toy}
          viewToy={props.viewToy}
          setViewToy={props.setViewToy}
          order={props.order}
          setOrder={props.setOrder}
          isNew = {false}
        />
      ))}
    </div>
  );
}

export default function Toys(props) {
  const [viewToy, setViewToy] = useState(false);
  return (
    <>
      {!viewToy && <Banner 
        imagePath={bannerImage}
        title='Toy Catalog'
      />}

      {!viewToy && <h2>Current Toys</h2>}

      {!viewToy && <p id="catalog-subtitle">Click the photos for more information</p>}
      
      <ToyGrid_new order={props.order} setOrder={props.setOrder} viewToy={viewToy} setViewToy={setViewToy}/>

      {!viewToy && <h2 id="catalog-title">Last Season's Toys</h2>}
      <ToyGrid_old order={props.order} setOrder={props.setOrder} viewToy={viewToy} setViewToy={setViewToy}/>

      {!viewToy && <img
        src={require("../images/logo.png")}
        className="catch-logo"
        alt="CATCH Logo"
      />}
      <p>Photo credits: Hieu</p>
    </>
  );
}
