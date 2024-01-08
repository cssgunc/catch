import { collection, getDocs } from '@firebase/firestore';
import { db } from '../firebase-config';

const recentEvents2Ref = collection(db, 'recentEvents2');

export const getRecentEvents2Info = async () => {
  const recentEventsArray = [];

  try {
    const querySnapshot = await getDocs(recentEvents2Ref);
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data.image = `https://drive.google.com/uc?export=view&id=${data.imageID}`
      recentEventsArray.push(data);
    });
  } catch (error) {
    console.error("Error fetching media data:", error);
  }
  return recentEventsArray;
}