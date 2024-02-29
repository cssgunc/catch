import { doc } from "firebase/firestore";
import { db } from "../firebase-config.js";

const formatAndFetchString = function (stringToStyle) {
  const toyName = stringToStyle.replace(/\W/g, "").toLowerCase();
  const toyRef = doc(db, "toys", toyName);
  return toyRef;
};
export default formatAndFetchString;
