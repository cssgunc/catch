import React from "react";
import { db } from '../firebase-config.js';
import { doc } from 'firebase/firestore';
import { useRef } from "react";

const formatAndFetchString = function(stringToStyle) {
    const toyName = stringToStyle.replace(/\W/g, '').toLowerCase();
    const toyRef = doc(db, "toys", toyName);
    return toyRef;
} 
export default formatAndFetchString;