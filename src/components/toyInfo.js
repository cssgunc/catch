import { collection, getDocs } from '@firebase/firestore';
import { db } from '../firebase-config'; 


const toysRef = collection(db, 'toys'); 

const toyInfo = [
];

async function getToyInfo() {
  const toys = [];

    try {
      const querySnapshot = await getDocs(toysRef);
      querySnapshot.forEach((doc) => {
        toys.push(doc.data());
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    return toys
  }
  
  const dynamicToyInfo = getToyInfo()

  export {toyInfo, dynamicToyInfo}

