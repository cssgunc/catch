import React, { useEffect, useState } from "react";
import "react-slideshow-image/dist/styles.css";
import Banner from "../components/Banner";
import { getDonationInfo, totalDonated } from "../components/donationInfo.js";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "./Donations.css";

<link href="https://fonts.googleapis.com/css?family=Google+Sans:400,500|Roboto:300,400,500,700|Source+Code+Pro:400,700&display=swap"></link>;

function DonationBox(props) {
  var screenWidth = window.innerWidth;
  return (
    <div>
      {screenWidth >= 900 ? (
        <DonationBoxDesktop desktop={props} />
      ) : (
        <DonationBoxMobile mobile={props} />
      )}
    </div>
  );
}

function DonationBoxDesktop(props) {
  return (
    <div className="sitesection">
      <div
        className="text-box"
        style={{
          paddingLeft: "3%",
          paddingRight: "3%",
          position: "relative",
        }}
      >
        <h3>
          <b>{props.desktop.organization}</b>
        </h3>

        {/* {props.desktop.description !== "" && (
          <div className="description">{props.desktop.description}</div>
        )} */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            position: "absolute",
            top: "40%",
            left: "0%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
              color: "#F36F39",
              fontWeight: "800",
              fontSize: "3.5vw",
            }}
          >
            <div>{props.desktop.total}</div>
            <div>{props.desktop.donations}</div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
              fontWeight: "550",
              fontSize: "1.5vw",
            }}
          >
            <strong>Total Toys Donated</strong>
            <strong>Total Donations</strong>
          </div>
        </div>
      </div>
      <img
        src={props.desktop.imagePath}
        className="pic"
        alt={"Donation to " + props.desktop.organization}
        style={{
          minWidth: "45%",
          width: "45%",
          maxWidth: "45%",
          maxHeight: "45%",
          aspectRatio: "1",
          objectFit: "cover",
        }}
      />
    </div>
  );
}

function DonationBoxMobile(props) {
  return (
    <div className="mobile-section">
      <h3 className="org-name">
        <b>{props.mobile.organization}</b>
      </h3>
      <div className="pic">
        <img
          src={props.mobile.imagePath}
          className="pictures"
          alt={"Donation to " + props.mobile.organization}
          style={{
            maxWidth: "80%",
            minWidth: "80%",
            minHeight: "80%",
            maxHeight: "80%",
            aspectRatio: "1",
            objectFit: "cover",
          }}
        />
      </div>
      {/* {props.mobile.description !== "" && (
        <div className="description">{props.mobile.description}</div>
      )} */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            color: "#F36F39",
            fontWeight: "800",
            fontSize: "30px",
            marginTop: "4%",
          }}
        >
          <div>{props.mobile.total}</div>
          <div>{props.mobile.donations}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            fontWeight: "550",
            fontSize: "13px",
          }}
        >
          <strong>Total Toys Donated</strong>
          <strong>Total Donations</strong>
        </div>
      </div>
    </div>
  );
}

function DonationDisplay(props) {
  const [donationsInfo, setDonationsInfo] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      const donationsData = await getDonationInfo();
      // sort donationsData (list of objects) from greatest to least by field value total
      donationsData.sort((a, b) => (a.total > b.total ? -1 : 1));
      setDonationsInfo(donationsData);
      setLength(donationsData.length);
    };

    fetchDonations();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(0);

  const nextSlide = () => {
    const nextIndex = currentIndex === length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  };

  const prevSlide = () => {
    const nextIndex = currentIndex === 0 ? length - 1 : currentIndex - 1;
    setCurrentIndex(nextIndex);
  };

  return (
    <div className="slideshow">
      <div className="slide">
        {donationsInfo.length > 0 ? (
          <div className="slide-active">
            <DonationBox
              organization={donationsInfo[currentIndex].organization}
              total={donationsInfo[currentIndex].total}
              donations={donationsInfo[currentIndex].donations}
              description={donationsInfo[currentIndex].description}
              imagePath={`https://imgur.com/${donationsInfo[currentIndex].imagePath}.jpg`}
            />
          </div>
        ) : (
          <p>Loading...</p>
        )}
        {/* {donationsInfo.length > 0 ? (
        donationsInfo.map((donation) => (
          <DonationBox
            key={donation.imagePath}
            organization={donation.organization}
            total={donation.total}
            donations={donation.donations}
            description={donation.description}
            imagePath={`https://imgur.com/${donation.imagePath}.jpg`}
          />
        ))
      ) : (
        <p>Loading...</p>
      )} */}
        <button onClick={prevSlide} className="left-arrow">
          <FaChevronLeft />
        </button>
        <button onClick={nextSlide} className="right-arrow">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default function Donations() {
  const gofundmeform = "https://gofund.me/9dca4d2f";
  const formUrl1 =
    "https://docs.google.com/forms/d/e/1FAIpQLSfOhVwyU37XieVYEo73C-MyJ1XbY_Hfcy-VB3D31d7F2Tf0Qg/viewform";
  const formUrl2 =
    "https://docs.google.com/forms/d/e/1FAIpQLSfACZzhpliXiEolrF0IDf89XFW_RHx7DaSZkDeDLLF618HE1A/viewform";
  const [totalDonatedDisplay, settotalDonated] = useState([]);

  useEffect(() => {
    const fetchTotalDonated = async () => {
      const donatedData = await totalDonated();
      settotalDonated(donatedData.totalDonated);
    };
    fetchTotalDonated();
  }, []);

  return (
    <>
      <Banner
        imagePath="banner/donations_banner_color.jpeg"
        title="Donations"
      />

      <h2 style={{ paddingTop: "100px" }}>
        <b>Past Donation Sites</b>
      </h2>
      <div>
        <b className="totalDonatedDisplay">{totalDonatedDisplay}</b>
        <div className="totalDonatedSubheading">Total Toys Donated</div>
      </div>
      <DonationDisplay />
      <div id="pastpartnersection">
        <p>
          <em>* Donation data collection began in Spring 2021.</em>
        </p>
      </div>

      <iframe
        src={gofundmeform}
        id="gfm-form"
        title="gofundme form"
        style={{ width: "80%", height: "676px", overflow: "scroll" }}
      ></iframe>
    </>
  );
}
