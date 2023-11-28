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
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../firebase-config';


const toysRef = collection(db, 'toys'); 

// const toyInfo = [
// ];

// async function getToyInfo() {
//   const toys = [];

//     try {
//       const querySnapshot = await getDocs(toysRef);
//       querySnapshot.forEach((doc) => {
//         toys.push(doc.data());
//       });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//     return toys
//   }
  
//   const dynamicToyInfo = getToyInfo()

async function getDynamicRecentToys() {
  const toys = [];

    try {
      const querySnapshot = await getDocs(toysRef);
      querySnapshot.forEach((doc) => {
        if (doc.data().current) {
          toys.push(doc.data());
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    return toys
  }

  async function getDynamicOldToys() {
    const toys = [];
  
      try {
        const querySnapshot = await getDocs(toysRef);
        querySnapshot.forEach((doc) => {
          if (!doc.data().current) {
            toys.push(doc.data());
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      return toys
    }

export const dynamicRecentToys = getDynamicRecentToys()
export const dynamicOldToys = getDynamicOldToys()

export const recentToys = [
    {description: "Who said you need Jurassic Park to see a real-life dinosaur? The Robo-Alive Attacking T-Rex Dinosaur can stomp, walk, bite, and roar – all at a push of a button!", name: "Attacking T-Rex Dinosaur", imagePath: trexImage, altText: 'Modfified T-Rex Toy', buildURL: 'https://docs.google.com/presentation/d/1wbJqiEVo8fUr-7MK_vaexr9-cqTBe6HjSzHXuhyEOuY/edit#slide=id.p'},
    {description: "Up, up and away we go! This plane lights up and moves at the push of a button!", name: "Zero Aircraft", imagePath: airplaneImage, altText: 'Modfified Airplane Toy', buildURL: 'https://docs.google.com/presentation/d/1sG6zYR71rNoACMY5j51roubwaqilKjNm_EgJfxFn7VU/edit#slide=id.p'},
    {description: "Turn trash into treasure with our garbage truck – where cleanup becomes a blast!", name: "Garbage Truck", imagePath: garbageTruckImage, altText: 'Modfified Truck Toy', buildURL: 'https://docs.google.com/presentation/d/12rRDEw87h6ICf5L7guNQBBB5o5kUtJ3QybOLMZ_QNRg/edit?usp=sharing'},
    {description: "Want to see the bus go round and round? With this toy, you can! At the push of a button, this school bus will DRIVE!", name: "School Bus", imagePath: schoolBusImage, altText: 'Modfified Bus Toy', buildURL: ''},
    {description: "", name: "Car", imagePath: automobileImage, altText: 'Modfified Automobile Toy', buildURL: 'https://docs.google.com/presentation/d/1wNAGJYabdsUwAWgdzBGDGSQVSf8A0drX-7Vv6Ua_UU4/edit#slide=id.ge901fea6e3_0_80'},
    {description: "Race to the rescue with our fire truck! Be ready to ignite an adventure to save the day!", name: "Firetruck", imagePath: firetruckImage, altText: 'Modfified Firetruck Toy', buildURL: 'https://docs.google.com/presentation/d/1rYG7PFngmJgI7uBpoO3ydhBF3RiEJJCjJ8ZIl-tqLXY/edit#slide=id.p'},
    {description: "Want to bubble up some fun? With farmer truck bubbles, you can all day!", name: "Farmer Truck Bubbles", imagePath: tractorImage, altText: 'Modfified Tractor Toy', buildURL: 'https://docs.google.com/presentation/d/1wNAGJYabdsUwAWgdzBGDGSQVSf8A0drX-7Vv6Ua_UU4/edit#slide=id.p'},
    {description: "Slide into your very own Arctic adventure with our penguin slide!", name: "Penguin Slide", imagePath: penguinImage, altText: 'Modfified Penguin Toy', buildURL: 'https://docs.google.com/document/d/1rYR7cj2QgniXExzF7qxCrk9XsvUmf7qV7L0kWtusydA/edit'},
    {description: "", name: "Pixie", imagePath: pixieImage, altText: 'Modfified Pixie Toy', buildURL: ''}
];

export const oldToys = [
    {description: "", name: "Lizard", imagePath: lizardImage, altText: 'Modfified Lizard Toy', buildURL: ''},
    {description: "", name: "Snake", imagePath: snakeImage, altText: 'Modfified Snake Toy', buildURL: ''},
    {description: "", name: "Alien", imagePath: alienImage, altText: 'Modfified Alien Toy', buildURL: ''},
    {description: "", name: "Dog", imagePath: dogImage, altText: 'Modfified Dog Toy', buildURL: ''}
]


console.log(recentToys)
console.log(oldToys)
