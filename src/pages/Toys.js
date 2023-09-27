import React, { useState } from "react";
import { FaHammer, FaPlus, FaChevronLeft } from "react-icons/fa";
import trexImage from '../images/Toy Catolog/trex.jpg';
import airplaneImage from '../images/Toy Catolog/airplane.jpg';
import garbageTruckImage from '../images/Toy Catolog/garbagetruck.jpg';
import schoolBusImage from '../images/Toy Catolog/bus.jpg';
import snakeImage from '../images/Toy Catolog/snake.jpg';
import automobileImage from '../images/Toy Catolog/dinocar.jpg';
import firetruckImage from '../images/Toy Catolog/firetruck.jpg';
import tractorImage from '../images/Toy Catolog/tractor.jpg';
import lizardImage from '../images/Toy Catolog/lizard.jpg';
import penguinImage from '../images/Toy Catolog/penguin.jpg';
import alienImage from '../images/Toy Catolog/alien.jpg';
import dogImage from '../images/Toy Catolog/dog.jpg';
import pixieImage from '../images/Toy Catolog/pixie.jpg';
import Banner from "../components/Banner";
import bannerImage from '../images/Toy Catolog/banner.jpg'

import './Toys.css'

function ToyPage(props) {

  const handleClick = () => {
    props.setViewToy(false);
    props.setActiveToy(false);
  };

  return(
    <>
    <div className='toy-container'>
      <button className="back-button" onClick={() => handleClick()}>
        <FaChevronLeft size={40}/>
      </button>
      <img src={props.details.imagePath} className='main-picture' alt=""></img>
      <div className='toy-details'>
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
          <button className="build-button">
            <div className="button-holder">
              <FaHammer size={20} style={{marginRight:"10px"}}/> <span>Make Yourself</span>
            </div>
          </button>
          <div className="button-break"/>
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
    tempOrder.push({"name": props.details.name, "quantity": 1});
    props.setOrder(tempOrder);
  }

  return (
    <>
      {!props.viewToy && 
      <div className="image-tile">
        <img onClick={() => handleClick()} src={props.details.imagePath} alt={props.details.altText} class="catalog-picture"/>
        <button className="plus-toy" onClick={() => addToyToCart(props.setOrder, props.order, props.details)}>
          <FaPlus size={10}/>
        </button>
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

function ToyGrid(props) {
  const toyInfo = [
    {description: "temp description", name: "T-Rex", imagePath: trexImage, altText: 'Modfified T-Rex Toy', buildURL: 'https://docs.google.com/presentation/d/1wbJqiEVo8fUr-7MK_vaexr9-cqTBe6HjSzHXuhyEOuY/edit#slide=id.p'},
    {description: "temp description", name: "Airplane", imagePath: airplaneImage, altText: 'Modfified Airplane Toy', buildURL: 'https://docs.google.com/presentation/d/1sG6zYR71rNoACMY5j51roubwaqilKjNm_EgJfxFn7VU/edit#slide=id.p'},
    {description: "temp description", name: "Garbage Truck", imagePath: garbageTruckImage, altText: 'Modfified Truck Toy', buildURL: 'https://docs.google.com/presentation/d/12rRDEw87h6ICf5L7guNQBBB5o5kUtJ3QybOLMZ_QNRg/edit?usp=sharing'},
    {description: "temp description", name: "School Bus", imagePath: schoolBusImage, altText: 'Modfified Bus Toy', buildURL: ''},
    {description: "temp description", name: "Snake", imagePath: snakeImage, altText: 'Modfified Snake Toy', buildURL: ''},
    {description: "temp description", name: "Car", imagePath: automobileImage, altText: 'Modfified Automobile Toy', buildURL: 'https://docs.google.com/presentation/d/1wNAGJYabdsUwAWgdzBGDGSQVSf8A0drX-7Vv6Ua_UU4/edit#slide=id.ge901fea6e3_0_80'},
    {description: "temp description", name: "Firetruck", imagePath: firetruckImage, altText: 'Modfified Firetruck Toy', buildURL: 'https://docs.google.com/presentation/d/1rYG7PFngmJgI7uBpoO3ydhBF3RiEJJCjJ8ZIl-tqLXY/edit#slide=id.p'},
    {description: "temp description", name: "Tractor", imagePath: tractorImage, altText: 'Modfified Tractor Toy', buildURL: 'https://docs.google.com/presentation/d/1wNAGJYabdsUwAWgdzBGDGSQVSf8A0drX-7Vv6Ua_UU4/edit#slide=id.p'},
    {description: "temp description", name: "Lizard", imagePath: lizardImage, altText: 'Modfified Lizard Toy', buildURL: ''},
    {description: "temp description", name: "Penguin", imagePath: penguinImage, altText: 'Modfified Penguin Toy', buildURL: 'https://docs.google.com/document/d/1rYR7cj2QgniXExzF7qxCrk9XsvUmf7qV7L0kWtusydA/edit'},
    {description: "temp description", name: "Alien", imagePath: alienImage, altText: 'Modfified Alien Toy', buildURL: ''},
    {description: "temp description", name: "Dog", imagePath: dogImage, altText: 'Modfified Dog Toy', buildURL: ''},
    {description: "temp description", name: "Pixie", imagePath: pixieImage, altText: 'Modfified Pixie Toy', buildURL: ''}
  ]

  return (
    <div id="catalog">
      {toyInfo.map((toy) => (
        <Toy
          details={toy}
          viewToy={props.viewToy}
          setViewToy={props.setViewToy}
          order={props.order}
          setOrder={props.setOrder}
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

      {!viewToy && <h3 id="catalog-title">Adapted Toys</h3>}

      <ToyGrid order={props.order} setOrder={props.setOrder} viewToy={viewToy} setViewToy={setViewToy}/>

      {!viewToy && <img
        src={require("../images/logo.png")}
        class="catch-logo"
        alt="CATCH Logo"
      />}
    </>
  );
}
