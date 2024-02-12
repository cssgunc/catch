import { collection, getDocs } from '@firebase/firestore';
import { db } from '../firebase-config';


const slideRef = collection(db, 'mainSlideshow'); 

export const getSlideshowImages = async () => {
  const images = [];

 
    try {
      const querySnapshot = await getDocs(slideRef);
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.imagePath = `https://drive.google.com/thumbnail?sz=w1000&id=${data.imageID}`
        images.push(data);
      });
    } catch (error) {
      console.error("Error fetching main slideshow data:", error);
    }
    return images;

  }