import { collection, getDocs } from "@firebase/firestore";
import { db } from "../firebase-config";

const toysRef = collection(db, "toys");

export const getDynamicRecentToys = async () => {
  const toys = [];

  try {
    const querySnapshot = await getDocs(toysRef);
    querySnapshot.forEach((doc) => {
      if (doc.data().current) {
        let data = doc.data();
        data.imagePath = `https://i.imgur.com/${data.imageID}.jpg`;
        toys.push(data);
      }
    });
  } catch (error) {
    console.error("Error fetching media data:", error);
  }
  return toys;
};

export const getDynamicOldToys = async () => {
  const toys = [];

  try {
    const querySnapshot = await getDocs(toysRef);
    querySnapshot.forEach((doc) => {
      if (!doc.data().current) {
        let data = doc.data();
        data.imagePath = `https://i.imgur.com/${data.imageID}.jpg`;
        toys.push(data);
      }
    });
  } catch (error) {
    console.error("Error fetching media data:", error);
  }
  return toys;
};
