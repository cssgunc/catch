import { collection, getDocs, query, orderBy } from '@firebase/firestore';
import { db } from '../firebase-config';

const mediaRef = collection(db, 'media');

export const getMediaInfo = async () => {
  const mediaArray = [];

  try {
    const querySnapshot = await getDocs(query(mediaRef, orderBy("id")));
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data.image = `https://lh3.googleusercontent.com/d/${data.imageID}=w1000`
      mediaArray.push(data);
    });
  } catch (error) {
    console.error("Error fetching media data:", error);
  }
  return mediaArray;
}