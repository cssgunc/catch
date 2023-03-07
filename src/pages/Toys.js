import React from "react";
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




function Toy(props) {
  if (props.buildURL !== '') {
    return (
      <a href={props.buildURL}>
        <img src={props.imagePath} alt={props.altText} class="catalog-picture" />
      </a>
    );
  }
  return (
    <img src={props.imagePath} alt={props.altText} class="catalog-picture" />
  );
}

function ToyGrid() {
  const toyInfo = [
    {imagePath: trexImage, altText: 'Modfified T-Rex Toy', buildURL: 'https://docs.google.com/presentation/d/1wbJqiEVo8fUr-7MK_vaexr9-cqTBe6HjSzHXuhyEOuY/edit#slide=id.p'},
    {imagePath: airplaneImage, altText: 'Modfified Airplane Toy', buildURL: 'https://docs.google.com/presentation/d/1sG6zYR71rNoACMY5j51roubwaqilKjNm_EgJfxFn7VU/edit#slide=id.p'},
    {imagePath: garbageTruckImage, altText: 'Modfified Truck Toy', buildURL: 'https://docs.google.com/presentation/d/12rRDEw87h6ICf5L7guNQBBB5o5kUtJ3QybOLMZ_QNRg/edit?usp=sharing'},
    {imagePath: schoolBusImage, altText: 'Modfified Bus Toy', buildURL: ''},
    {imagePath: snakeImage, altText: 'Modfified Snake Toy', buildURL: ''},
    {imagePath: automobileImage, altText: 'Modfified Automobile Toy', buildURL: 'https://docs.google.com/presentation/d/1wNAGJYabdsUwAWgdzBGDGSQVSf8A0drX-7Vv6Ua_UU4/edit#slide=id.ge901fea6e3_0_80'},
    {imagePath: firetruckImage, altText: 'Modfified Firetruck Toy', buildURL: 'https://docs.google.com/presentation/d/1rYG7PFngmJgI7uBpoO3ydhBF3RiEJJCjJ8ZIl-tqLXY/edit#slide=id.p'},
    {imagePath: tractorImage, altText: 'Modfified Tractor Toy', buildURL: 'https://docs.google.com/presentation/d/1wNAGJYabdsUwAWgdzBGDGSQVSf8A0drX-7Vv6Ua_UU4/edit#slide=id.p'},
    {imagePath: lizardImage, altText: 'Modfified Lizard Toy', buildURL: ''},
    {imagePath: penguinImage, altText: 'Modfified Penguin Toy', buildURL: 'https://docs.google.com/document/d/1rYR7cj2QgniXExzF7qxCrk9XsvUmf7qV7L0kWtusydA/edit'},
    {imagePath: alienImage, altText: 'Modfified Alien Toy', buildURL: ''},
    {imagePath: dogImage, altText: 'Modfified Dog Toy', buildURL: ''},
    {imagePath: pixieImage, altText: 'Modfified Pixie Toy', buildURL: ''}
  ]

  return (
    <div id="catalog-holder">
      <div id="catalog">
        {toyInfo.map((toy) => (
          <Toy
            buildURL={toy.buildURL}
            imagePath={toy.imagePath}
            altText={toy.altText}
          />
        ))}
      </div>
    </div>
  );
}

export default function Toys() {
  return (
    <>
      <Banner 
        imagePath={bannerImage}
        title='Toy Catalog'
      />

      <h3><b>Adapted Toys</b></h3>
      <div><i>Click on the photos to view the toy guides</i></div>

      <ToyGrid />

      <img
        src={require("../images/logo.png")}
        class="catch-logo"
        alt="CATCH Logo"
      />
    </>
  );
}
