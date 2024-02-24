import { collection, getDocs } from '@firebase/firestore';
import { db } from '../firebase-config';

const recentEvents3Ref = collection(db, 'recentEvents3');

export const getRecentEvents3Info = async () => {
  const recentEventsArray = [];

  try {
    const querySnapshot = await getDocs(recentEvents3Ref);
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data.imagePath = `https://imgur.com/${data.imageID}.jpg`;
      recentEventsArray.push(data);
    });
  } catch (error) {
    console.error("Error fetching media data:", error);
  }
  return recentEventsArray;
}