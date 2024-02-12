import { collection, getDocs } from '@firebase/firestore';
import { db } from '../firebase-config';

const recentEvents4Ref = collection(db, 'recentEvents4');

export const getRecentEvents4Info = async () => {
  const recentEventsArray = [];

  try {
    const querySnapshot = await getDocs(recentEvents4Ref);
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data.image = `https://drive.google.com/thumbnail?sz=w1000&id=${data.imageID}`
      recentEventsArray.push(data);
    });
  } catch (error) {
    console.error("Error fetching media data:", error);
  }
  return recentEventsArray;
}