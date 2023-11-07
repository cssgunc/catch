import React from 'react';
import { useEffect, useState } from 'react';
import Slider from "../components/Slider.js";
import { db } from '../firebase-config.js';
import { collection, doc, getDoc, getDocs, updateDoc, increment, serverTimestamp} from 'firebase/firestore';
import CountUp from 'react-countup';
import formatAndFetchString from '../helper-functions/lowercase-and-remove-non-alph.js'

import "./Home.css";

const interestMeetingImages = [
  {image: require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_8690.JPEG")},
  {image: require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_8691.JPEG")},
  {image: require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_8694.JPEG")},
  {image: require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_8695.JPEG")},
  {image: require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_8696.JPEG")},
  {image: require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_8697.JPEG")},
  {image: require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_8698.JPEG")},
  {image: require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_8700.JPEG")},
  {image: require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_8701.JPEG")},
  {image: require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_8702.JPEG")},
  {image: require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_8703.JPEG")},
  {image: require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_9964.HEIC")},
  {image: require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_9965.HEIC")},
  {image: require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_9966.HEIC")},
]

const firstMeetingImages = [
  {image: require("../images/Home/First Meeting (9.13.22)/catch1.jpg")},
  {image: require("../images/Home/First Meeting (9.13.22)/catch2.jpg")},
  {image: require("../images/Home/First Meeting (9.13.22)/catch3.jpg")},
  {image: require("../images/Home/First Meeting (9.13.22)/catch4.jpg")},
  {image: require("../images/Home/First Meeting (9.13.22)/catch5.jpg")},
  {image: require("../images/Home/First Meeting (9.13.22)/catch6.jpg")}
]

const lateNightImages = [
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1748.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1749.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1750.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1751.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1752.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1753.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1754.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1755.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1756.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1757.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1758.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1759.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1760.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1761.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1762.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1763.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1764.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1765.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1766.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1767.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-001A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-002A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-003A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-004A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-005A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-006A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-007A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-008A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-009A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-010A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-011A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-012A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-013A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-014A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-015A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-016A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-017A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-018A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-019A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-020A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-021A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-022A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-023A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-024A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-025A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-026A.JPG")},
  {image: require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-027A.JPG")}
]

// WORKING WITH BACKEND START
export default function Home() {
  const toysUpdateRef = doc(db, 'lastUpdated', 'toysLastUpdated');
  const toysRef = collection(db, "toys"); //reference to toys collection in firestore database
  const donateSumRef = doc(db, 'totalDonated', 'totalDonated');
  const [toysTime, setToysTime] = useState()
  const [toys, setToys] = useState([]);
  const [donatedSum, setDonatedSum] = useState();
  
  // useEffect(() => {
  //   const getToys = async () => {
  //     const timeData = await getDoc(toysUpdateRef)
  //     const lastUpdated = timeData.get('toysLastUpdated');
  //     if (toysTime === undefined || !lastUpdated.isEqual(toysTime)) {
  //       const data = await getDocs(toysRef);
  //       setToys(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
  //       setToysTime(lastUpdated);
  //     }
  //   }
  //   getToys()
  // })

  // useEffect(() => {
  //   const getTotalDonated = async () => {

  //     const sumData = await getDoc(donateSumRef);
  //     const currSum = sumData.get('totalDonated');
  //     if (currSum !== donatedSum) {
  //       setDonatedSum(currSum);
  //     }
  //   }
  //   getTotalDonated()
  // })

  const completeOrder = async (orderId) => {
    const orderRef = doc(db, 'orders', orderId); // Replace 'orderId' with the actual document ID of the order you want to update
    const orderData = await getDoc(orderRef);
    if (!orderData.exists()) {
      console.error('Error accessing document data');
      return;
    } 
    
    //Development note: Comment out this code block if repeatedly testing on the same order; revert to K & R style with above if statement for production
    else if (orderData.get("completed") === true) {
      console.error('Order already completed');
      return;
    }
    const updateData = { completed: true };
    await updateDoc(orderRef, updateData);

    const order = orderData.get("order");
    const orderToys = Object.keys(order);
    let sum = 0;

    for (let i = 0; i < orderToys.length; i++) {
      const toyRef = formatAndFetchString(orderToys[i]);
      // const toyName = orderToys[i].replace(/\W/g, '').toLowerCase();
      // const toyRef = doc(db, "toys", toyName);

      const currOrderAmt = order[orderToys[i]];

      await updateDoc(toyRef, {donated: increment(currOrderAmt)});
      sum += currOrderAmt;
    }

    await updateDoc(toysUpdateRef, {toysLastUpdated: serverTimestamp()});

    //Ensure that the totalDonated field is defined as an integer, or its current value will be replaced by sum.  
    await updateDoc(donateSumRef, {totalDonated: increment(sum)});
  };

  // WORKING WITH BACKEND END

  return (
    <>
      <h1>Total Donated</h1>
      <h1>
        <CountUp
          duration={2}
          end={donatedSum}
          useEasing={true}
        />
      </h1>
      <hr></hr>
      <h2>Recent Events</h2>
      <div className="carousel">
        <div className="carouselItem">
          <p>Late Night with Toys (9.9.22)</p>
          <Slider slides={lateNightImages} />
        </div>
        <div className="carouselItem">
          <p>First Meeting (9.13.22)</p>
          <Slider slides={firstMeetingImages} />
        </div>
        <div className="carouselItem">
          <p>Interest Meeting (8.30.22)</p>
          <Slider slides={interestMeetingImages} />
        </div>
      </div>
      <br/>
      <button disabled onClick={() => completeOrder("orderExample")}>Complete Order</button>
    </>
  )
}
