import { collection, getDocs } from "@firebase/firestore";
import { db } from "../firebase-config";

const recentEvents1Ref = collection(db, "recentEvents1");

export const getRecentEvents1Info = async () => {
  const recentEventsArray = [];

  try {
    const querySnapshot = await getDocs(recentEvents1Ref);
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data.imagePath = `https://i.imgur.com/${data.imageID}.jpg`;
      recentEventsArray.push(data);
    });
  } catch (error) {
    console.error("Error fetching media data:", error);
  }
  return recentEventsArray;
};
