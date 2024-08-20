import { collection, getDocs } from "@firebase/firestore";
import { db } from "../firebase-config";

const recentEvents4Ref = collection(db, "recentEvents4");

export const getRecentEvents4Info = async () => {
  const recentEventsArray = [];

  try {
    const querySnapshot = await getDocs(recentEvents4Ref);
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
