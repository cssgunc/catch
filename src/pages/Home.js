import React, { Suspense, useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import { getSlideshowImages } from "../components/mainSlideshowInfo.js";
import { getRecentEvents1Info } from "../components/recentEvents1Info.js";
import { getRecentEvents2Info } from "../components/recentEvents2Info.js";
import { getRecentEvents3Info } from "../components/recentEvents3Info.js";
import { getRecentEvents4Info } from "../components/recentEvents4Info.js";

import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Mesh, NoToneMapping } from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import "react-multi-carousel/lib/styles.css";
import "./Home.css";

const Truck = () => {
  const texture = useTexture("firetruck/FireEngine.png");
  const materials = useLoader(MTLLoader, "firetruck/FireEngine.mtl");
  const obj = useLoader(OBJLoader, "firetruck/FireEngine.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  obj.traverse((child) => {
    if (child instanceof Mesh) {
      child.material.map = texture;
    }
  });
  const position = [0.5, -0.6, 0.3];
  const rotation = [0.4, -0.8, 0];
  return (
    <group position={position} rotation={rotation}>
      <primitive object={obj} scale={0.65} />
    </group>
  );
};

function MainSlideshow() {
  const [mainSlideshow, setMainSlideshow] = useState([]);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const fetchSlideshow = async () => {
      try {
        const slideData = await getSlideshowImages();
        // Check if the component is still mounted before updating state
        if (isMounted) {
          setMainSlideshow(slideData);
        }
      } catch (error) {
        // Handle error
        console.error("Error fetching slideshow data:", error);
      }
    };

    fetchSlideshow();

    // Cleanup function to set isMounted to false when the component is unmounted
    return () => {
      setIsMounted(false);
    };
  }, [isMounted]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 664, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
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
      {mainSlideshow.map((imagePath, index) => (
        <img
          key={index}
          className="carousel-image"
          src={imagePath.imagePath}
          alt={`Carousel pic ${index + 1}`}
        />
      ))}
    </Carousel>
  );
}

// WORKING WITH BACKEND START
export default function Home() {
  const [recentEvents1, setrecentEvents1] = useState([]);

  useEffect(() => {
    const fetchRecentEvents1 = async () => {
      const recentEventData = await getRecentEvents1Info();
      setrecentEvents1(recentEventData);
    };

    fetchRecentEvents1();
    console.log(recentEvents1);
  }, []);

  const [recentEvents2, setrecentEvents2] = useState([]);

  useEffect(() => {
    const fetchRecentEvents2 = async () => {
      const recentEventData = await getRecentEvents2Info();
      setrecentEvents2(recentEventData);
    };

    fetchRecentEvents2();
  }, []);

  const [recentEvents3, setrecentEvents3] = useState([]);

  useEffect(() => {
    const fetchRecentEvents3 = async () => {
      const recentEventData = await getRecentEvents3Info();
      setrecentEvents3(recentEventData);
    };

    fetchRecentEvents3();
  }, []);

  const [recentEvents4, setrecentEvents4] = useState([]);

  useEffect(() => {
    const fetchRecentEvents4 = async () => {
      const recentEventData = await getRecentEvents4Info();
      setrecentEvents4(recentEventData);
    };

    fetchRecentEvents4();
  }, []);

  const intro = useRef(null);
  const events = useRef(null);

  const goToIntro = () => {
    intro.current?.scrollIntoView({ behavior: "smooth" });
  };
  const goToEvents = () => {
    events.current?.scrollIntoView({ behavior: "smooth" });
  };

  const responsiveEvents = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 664, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <div className="landing">
        <div className="tagline">
          <h1>Hi! We're CATCH!</h1>
          <p>
            Where we strive to "catch" the children who fall through the cracks
            of the mainstream toy market.
          </p>
          <button onClick={goToIntro}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7vw"
              height="7vw"
              viewBox="0 0 138 138"
              fill="none"
            >
              <circle cx="69" cy="69" r="69" fill="white" fill-opacity="0.3" />
              <path
                d="M42.1127 68.321C39.2958 65.5024 39.2958 60.9325 42.1127 58.1139C44.9296 55.2954 49.4967 55.2954 52.3137 58.1139L73.7812 79.5942C76.5981 82.4128 76.5981 86.9826 73.7812 89.8012C70.9642 92.6198 66.3971 92.6198 63.5802 89.8012L42.1127 68.321Z"
                fill="white"
              />
              <path
                d="M85.6863 58.1988C88.5033 55.3802 93.0704 55.3802 95.8873 58.1988C98.7042 61.0174 98.7042 65.5872 95.8873 68.4058L74.4198 89.8861C71.6029 92.7047 67.0358 92.7046 64.2188 89.8861C61.4019 87.0675 61.4019 82.4976 64.2188 79.679L85.6863 58.1988Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
        <div className="canvas-container">
          <Canvas
            gl={{ antialias: true, toneMapping: NoToneMapping }}
            linear
            className="model"
          >
            <ambientLight intensity={3} />
            <pointLight position={[5, 3, 5]} intensity={20} />
            <Suspense fallback={null}>
              <Truck className="truck" />
              <OrbitControls />
            </Suspense>
          </Canvas>
        </div>
      </div>

      <div id="introduction" ref={intro}>
        <h2>With the press of a button...</h2>
        <p>
          Carolina Adapts Toys for Children (CATCH) strives to "catch" the
          children who fall through the cracks of the mainstream toy market.
        </p>
        <div className="carousel-container">
          <MainSlideshow />
        </div>
        <button onClick={goToEvents}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            viewBox="0 0 138 138"
            fill="none"
          >
            <circle cx="69" cy="69" r="69" fill="#2EA397" fill-opacity="0.5" />
            <path
              d="M42.1127 68.321C39.2958 65.5024 39.2958 60.9325 42.1127 58.1139C44.9296 55.2954 49.4967 55.2954 52.3137 58.1139L73.7812 79.5942C76.5981 82.4128 76.5981 86.9826 73.7812 89.8012C70.9642 92.6198 66.3971 92.6198 63.5802 89.8012L42.1127 68.321Z"
              fill="white"
            />
            <path
              d="M85.6863 58.1988C88.5033 55.3802 93.0704 55.3802 95.8873 58.1988C98.7042 61.0174 98.7042 65.5872 95.8873 68.4058L74.4198 89.8861C71.6029 92.7047 67.0358 92.7046 64.2188 89.8861C61.4019 87.0675 61.4019 82.4976 64.2188 79.679L85.6863 58.1988Z"
              fill="white"
            />
          </svg>
        </button>
      </div>

      <div id="recent-events" ref={events}>
        <h2>Recent Events</h2>
        <div className="carousel">
          <div className="carouselItemWide">
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
              {recentEvents1.map((image, index) => (
                <div key={index}>
                  <img
                    className="carousel-image"
                    src={image.imagePath}
                    alt={`Pic ${index + 1}`}
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="carouselItemWide">
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
              {recentEvents2.map((image, index) => (
                <div key={index}>
                  <img
                    className="carousel-image"
                    src={image.imagePath}
                    alt={`Pic ${index + 1}`}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <div className="carousel">
          <div className="carouselItemWide">
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
              {recentEvents3.map((image, index) => (
                <div key={index}>
                  <img
                    className="carousel-image"
                    src={image.imagePath}
                    alt={`Pic ${index + 1}`}
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="carouselItemWide">
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
              {recentEvents4.map((image, index) => (
                <div key={index}>
                  <img
                    className="carousel-image"
                    src={image.imagePath}
                    alt={`Pic ${index + 1}`}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}
