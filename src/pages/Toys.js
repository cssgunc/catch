import React from 'react'

export default function Toys() {
  return (
    <div>
      <link rel = 'stylesheet' href = {require('./Toys.css')}></link>
      <div>
        <img src = {require('../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-020A.JPG')} id = 'background-picture' alt = 'CATCH Team'/>
      </div>
      <h1><b>Toy Catalog</b></h1>
      <h3><b>Adapted Toys</b></h3>
      <div><i>Click on the photos to view the toy guides</i></div>
      <div id = 'catalog-holder'>
        <div id = 'catalog'>
          <a href = 'https://docs.google.com/presentation/d/1wbJqiEVo8fUr-7MK_vaexr9-cqTBe6HjSzHXuhyEOuY/edit#slide=id.p'>
            <img src = {require('../images/Toy Catolog/Copy of trex.jpg')} class = 'catalog-picture' alt = 'Modified T-rex Toy'/>
          </a>
          <a href = 'https://docs.google.com/presentation/d/1sG6zYR71rNoACMY5j51roubwaqilKjNm_EgJfxFn7VU/edit#slide=id.p'>
            <img src = {require('../images/Toy Catolog/Copy of airplane.jpg')} class = 'catalog-picture' alt = 'Modified Plane Toy'/>
          </a>
          <a href = 'https://docs.google.com/presentation/d/12rRDEw87h6ICf5L7guNQBBB5o5kUtJ3QybOLMZ_QNRg/edit?usp=sharing'>
            <img src = {require('../images/Toy Catolog/Copy of garbage.jpg')} class = 'catalog-picture' alt = 'Modified Truck Toy'/>
          </a>
            <img src = {require('../images/Toy Catolog/Copy of bus.jpg')} class = 'catalog-picture' alt = 'Modified School Bus Toy'/> 
            <img src = {require('../images/Toy Catolog/Copy of snake.jpg')} class = 'catalog-picture' alt = 'Modified Snake Toy'/> 
          <a href = 'https://docs.google.com/presentation/d/1wNAGJYabdsUwAWgdzBGDGSQVSf8A0drX-7Vv6Ua_UU4/edit#slide=id.ge901fea6e3_0_80'>
            <img src = {require('../images/Toy Catolog/Copy of Edited_Dd.jpg')} class = 'catalog-picture' alt = 'Modified Automobile Toy'/> 
          </a>
          <a href = 'https://docs.google.com/presentation/d/1rYG7PFngmJgI7uBpoO3ydhBF3RiEJJCjJ8ZIl-tqLXY/edit#slide=id.p'>
            <img src = {require('../images/Toy Catolog/Copy of Edited_Ft.jpg')} class = 'catalog-picture' alt = 'Modified Fire Truck Toy'/>
          </a>
          <a href = 'https://docs.google.com/presentation/d/1wNAGJYabdsUwAWgdzBGDGSQVSf8A0drX-7Vv6Ua_UU4/edit#slide=id.p'>
            <img src = {require('../images/Toy Catolog/Copy of Edited_Tractor.jpg')} class = 'catalog-picture' alt = 'Modified Tractor Toy'/> 
          </a>
            <img src = {require('../images/Toy Catolog/Copy of Edited_Lizard.jpg')} class = 'catalog-picture' alt = 'Modified Lizard Toy'/> 
          <a href = 'https://docs.google.com/document/d/1rYR7cj2QgniXExzF7qxCrk9XsvUmf7qV7L0kWtusydA/edit'>
            <img src = {require('../images/Toy Catolog/Copy of Edited_Penguin.jpg')} class = 'catalog-picture' alt = 'Modified Penguin Slide Toy'/> 
          </a>
            <img src = {require('../images/Toy Catolog/Copy of Edited_Alien.jpg')} class = 'catalog-picture' alt = 'Modified Alien Toy'/> 
            <img src = {require('../images/Toy Catolog/Copy of Edited_Dog.jpg')} class = 'catalog-picture' alt = 'Modified Dog Toy'/> 
            <img src = {require('../images/Toy Catolog/Copy of Edited_Pixie.jpg')} class = 'catalog-picture' alt = 'Modified Pixie Toy'/>
        </div>
      </div>
      <div>
        <img src = {require('../images/logo.png')} class = 'catch-logo' alt = 'CATCH Logo'/>
      </div>
    </div>
  )
}
