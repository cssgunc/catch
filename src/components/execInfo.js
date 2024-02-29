import { collection, getDocs } from "@firebase/firestore";
import { db } from "../firebase-config";

const execRef = collection(db, "exec");

export async function getDynamicRecentExecInfo() {
  const execs = [];

  try {
    const querySnapshot = await getDocs(execRef);
    querySnapshot.forEach((doc) => {
      if (!doc.data().current) {
        let data = doc.data();
        data.image = `https://imgur.com/${data.imageID}.jpg`;
        execs.push(data);
      }
    });
    console.log(execs);
    execs.sort((a, b) => a.id - b.id);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return execs;
}