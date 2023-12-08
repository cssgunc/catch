import React from 'react';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import Slider from "../components/Slider.js";
import { db } from '../firebase-config.js';
import { collection, doc, getDoc, getDocs, updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import CountUp from 'react-countup';
import formatAndFetchString from '../helper-functions/lowercase-and-remove-non-alph.js'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Home.css'

const interestMeetingImages = [
  require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_8690.JPEG"),
  require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_8691.JPEG"),
  require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_8696.JPEG"),
  require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_8697.JPEG"),
  require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_8698.JPEG"),
  require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_8695.JPEG"),
  require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_8700.JPEG"),
  require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_8701.JPEG"),
  require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_8694.JPEG"),
  require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_8702.JPEG"),
  require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_8703.JPEG"),
  require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_9964.HEIC"),
  require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_9965.HEIC"),
  require("../images/Home/Interest Meeting (8.30.22)/Copy of IMG_9966.HEIC")
]



const firstMeetingImages = [
  require("../images/Home/First Meeting (9.13.22)/catch1.jpg"),
  require("../images/Home/First Meeting (9.13.22)/catch2.jpg"),
  require("../images/Home/First Meeting (9.13.22)/catch3.jpg"),
  require("../images/Home/First Meeting (9.13.22)/catch4.jpg"),
  require("../images/Home/First Meeting (9.13.22)/catch5.jpg"),
  require("../images/Home/First Meeting (9.13.22)/catch6.jpg")
]

const lateNightImages = [
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1748.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1749.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1750.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1751.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1752.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1753.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1754.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1755.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1756.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1757.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1758.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1759.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1760.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1761.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1762.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1763.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1764.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1765.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1766.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of IMG_1767.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-001A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-002A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-003A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-004A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-005A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-006A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-007A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-008A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-009A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-010A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-011A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-012A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-013A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-014A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-015A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-016A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-017A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-018A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-019A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-020A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-021A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-022A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-023A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-024A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-025A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-026A.JPG"),
  require("../images/Home/Late Night with Toys (9.9.22)/Copy of R1-07720-027A.JPG")
]

// Replace with getToyInfo()
const toyCatalog = [
  require("../images/Toy Catolog/airplane.jpg"),
  require("../images/Toy Catolog/alien.jpg"),
  require("../images/Toy Catolog/banner.jpeg"),
  require("../images/Toy Catolog/bus.jpg"),
  require("../images/Toy Catolog/dinocar.jpg"),
  require("../images/Toy Catolog/dinocar2.jpg"),
  require("../images/Toy Catolog/dog.jpg"),
  require("../images/Toy Catolog/firetruck.jpg"),
  require("../images/Toy Catolog/garbagetruck.jpg"),
  require("../images/Toy Catolog/lizard.jpg"),
  require("../images/Toy Catolog/penguin.jpg"),
  require("../images/Toy Catolog/pixie.jpg"),
  require("../images/Toy Catolog/school-bus.jpg"),
  require("../images/Toy Catolog/snake.jpg"),
  require("../images/Toy Catolog/toy_catolog_banner_color.jpeg"),
  require("../images/Toy Catolog/tractor.jpg"),
  require("../images/Toy Catolog/trex.jpg"),
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

  // Click and scroll

  const intro = useRef(null);
  const events = useRef(null)

  const goToIntro = () => {
    intro.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const goToEvents = () => {
    events.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Carousel

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 664, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  const responsiveEvents = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 664, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

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

      await updateDoc(toyRef, { donated: increment(currOrderAmt) });
      sum += currOrderAmt;
    }

    await updateDoc(toysUpdateRef, { toysLastUpdated: serverTimestamp() });

    //Ensure that the totalDonated field is defined as an integer, or its current value will be replaced by sum.  
    await updateDoc(donateSumRef, { totalDonated: increment(sum) });
  };

  // WORKING WITH BACKEND END

  return (
    <>
      {/* <h1>Total Donated</h1>
      <h1>
        <CountUp
          duration={2}
          end={donatedSum}
          useEasing={true}
        />
      </h1> */}
      <div className="landing">
        <div className="tagline">
          <h1>Hi! We're CATCH!</h1>
          <p>Where we strive to "catch" the children who fall through the cracks of the mainstream toy market.</p>
          <button onClick={goToIntro}>
            <svg xmlns="http://www.w3.org/2000/svg" width="7vw" height="7vw" viewBox="0 0 138 138" fill="none">
              <circle cx="69" cy="69" r="69" fill="white" fill-opacity="0.3" />
              <path d="M42.1127 68.321C39.2958 65.5024 39.2958 60.9325 42.1127 58.1139C44.9296 55.2954 49.4967 55.2954 52.3137 58.1139L73.7812 79.5942C76.5981 82.4128 76.5981 86.9826 73.7812 89.8012C70.9642 92.6198 66.3971 92.6198 63.5802 89.8012L42.1127 68.321Z" fill="white" />
              <path d="M85.6863 58.1988C88.5033 55.3802 93.0704 55.3802 95.8873 58.1988C98.7042 61.0174 98.7042 65.5872 95.8873 68.4058L74.4198 89.8861C71.6029 92.7047 67.0358 92.7046 64.2188 89.8861C61.4019 87.0675 61.4019 82.4976 64.2188 79.679L85.6863 58.1988Z" fill="white" />
            </svg>
          </button>
        </div>
        <div className="car-logo"></div>
      </div>


      <div id="introduction" ref={intro}>
        <h2>With the press of a button...</h2>
        <p>Carolina Adapts Toys for Children (CATCH) strives to "catch" the children who fall through the cracks of the mainstream toy market.</p>
        <div className="carousel-container">
          <Carousel
            swipeable={true}
            draggable={false}
            showDots={true}
            responsive={responsive}
            infinite={true}
            keyBoardControl={true}
            customTransition="transform 300ms ease-in-out"
            transitionDuration={500}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {toyCatalog.map((imagePath, index) => (
              <div key={index}>
                <img className="carousel-image" src={process.env.PUBLIC_URL + imagePath} alt={`Image ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </div>
        <button onClick={goToEvents}>
          <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 138 138" fill="none">
            <circle cx="69" cy="69" r="69" fill="#2EA397" fill-opacity="0.5" />
            <path d="M42.1127 68.321C39.2958 65.5024 39.2958 60.9325 42.1127 58.1139C44.9296 55.2954 49.4967 55.2954 52.3137 58.1139L73.7812 79.5942C76.5981 82.4128 76.5981 86.9826 73.7812 89.8012C70.9642 92.6198 66.3971 92.6198 63.5802 89.8012L42.1127 68.321Z" fill="white" />
            <path d="M85.6863 58.1988C88.5033 55.3802 93.0704 55.3802 95.8873 58.1988C98.7042 61.0174 98.7042 65.5872 95.8873 68.4058L74.4198 89.8861C71.6029 92.7047 67.0358 92.7046 64.2188 89.8861C61.4019 87.0675 61.4019 82.4976 64.2188 79.679L85.6863 58.1988Z" fill="white" />
          </svg>
        </button>
      </div>

      <div id="recent-events" ref={events}>
        <h2>Recent Events</h2>
        <div className="carousel">
          <div className="carouselItemWide">
            <p>Interest Meeting (8.30.22)</p>
            <Carousel
              swipeable={true}
              draggable={false}
              showDots={false}
              responsive={responsiveEvents}
              infinite={true}
              keyBoardControl={true}
              customTransition="transform 300ms ease-in-out"
              transitionDuration={500}
              containerClass="carousel-container"
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {interestMeetingImages.map((imagePath, index) => (
                <div key={index}>
                  <img className="carousel-image" src={process.env.PUBLIC_URL + imagePath} alt={`Image ${index + 1}`} />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="carouselItemWide">
            <p>Interest Meeting (8.30.22)</p>
            <Carousel
              swipeable={true}
              draggable={false}
              showDots={false}
              responsive={responsiveEvents}
              infinite={true}
              keyBoardControl={true}
              customTransition="transform 300ms ease-in-out"
              transitionDuration={500}
              containerClass="carousel-container"
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {interestMeetingImages.map((imagePath, index) => (
                <div key={index}>
                  <img className="carousel-image" src={process.env.PUBLIC_URL + imagePath} alt={`Image ${index + 1}`} />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <div className="carousel">
          <div className="carouselItemWide">
            <p>Late Night with Toys (9.9.22)</p>
            <Carousel
              swipeable={true}
              draggable={false}
              showDots={false}
              responsive={responsiveEvents}
              infinite={true}
              keyBoardControl={true}
              customTransition="transform 300ms ease-in-out"
              transitionDuration={500}
              containerClass="carousel-container"
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {lateNightImages.map((imagePath, index) => (
                <div key={index}>
                  <img className="carousel-image" src={process.env.PUBLIC_URL + imagePath} alt={`Image ${index + 1}`} />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="carouselItemWide">
            <p>First Meeting (9.13.22)</p>
            <Carousel
              swipeable={true}
              draggable={false}
              showDots={false}
              responsive={responsiveEvents}
              infinite={true}
              keyBoardControl={true}
              customTransition="transform 300ms ease-in-out"
              transitionDuration={500}
              containerClass="carousel-container"
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {firstMeetingImages.map((imagePath, index) => (
                <div key={index}>
                  <img className="carousel-image" src={process.env.PUBLIC_URL + imagePath} alt={`Image ${index + 1}`} />
                </div>
              ))}
            </Carousel>
          </div>
        </div>

        {/* <button disabled onClick={() => completeOrder("orderExample")}>Complete Order</button> */}
      </div >

      {/* <div className="get-involved">
        <h2>Want to get involved?</h2>
        <h3>Here are some ways you can make an impact!</h3>

        <div class="button-container">
          <div class="button-group">
            <p>Contact us and our team will get in touch with you</p>
            <button>Contact</button>
          </div>

          <div class="button-group">
            <p>Donate toys or give a financial contribution</p>
            <button>Donate</button>
          </div>

        </div>

        <center>
          <img
            src={require("../images/logo.png")}
            className="catch-logo"
            alt="CATCH Logo"
            style={{ width: '120px', height: 'auto', marginBottom: '20px' }}
          /></center>
      </div> */}
    </>
  )
}