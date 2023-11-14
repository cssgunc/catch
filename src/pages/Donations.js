
import React, { useEffect, useState } from "react";
//import bannerImage from "../images/Donations/banner.jpg";
import bannerImage from "../images/Donations/donations_banner_color.jpeg";
import Banner from "../components/Banner";
import org1Image from '../images/Donations/donation1.jpg';
import org2Image from '../images/Donations/donation2.jpg';
import org3Image from '../images/Donations/donation3.jpg';
import org4Image from '../images/Donations/donation4.jpg';
import org5Image from '../images/Donations/donation5.jpg';
import org6Image from '../images/Donations/donation6.jpg';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { db } from '../firebase-config'
import { collection, getDocs } from '@firebase/firestore'; // importing Firestore functions

import "./Donations.css";

<link href="https://fonts.googleapis.com/css?family=Google+Sans:400,500|Roboto:300,400,500,700|Source+Code+Pro:400,700&display=swap"></link>;

function DonationBox(props) {
  var screenWidth = window.innerWidth;
  return (
    <div>
      {screenWidth >= 1290 ? <DonationBoxDesktop desktop={props} /> : <DonationBoxMobile mobile={props} />}
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
        }}
      >
        <h3>
          <b>{props.desktop.organization}</b>
        </h3>

        {props.desktop.description !== '' &&
          <div className="description">
            {props.desktop.description}
          </div>
        }

        <div>
          <strong>Total Toys Donated: </strong>{props.desktop.total}
        </div>

        <div>
          <strong>Total Donation: </strong>{props.desktop.donations}
        </div>

      </div>
      <img
        src={props.desktop.imagePath}
        className="pic"
        alt={"Donation to " + props.desktop.organization}
        style={{
          maxWidth: "45%",
          maxHeight: "auto",
          borderRadius: "25px"
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
            maxHeight: "auto",
            borderRadius: "15px"
          }}
        />
      </div>
      {props.mobile.description !== '' &&
        <div className="description">
          {props.mobile.description}
        </div>
      }
      <div>
        <strong>Total Toys Donated: </strong>{props.mobile.total}
      </div>
      <div>
        <strong>Total Donation: </strong>{props.mobile.donations}
      </div>
    </div>
  );
}

function DonationDisplay() {
function GetDonationsInfo() {
  const [donationsInfo, setDonationsInfo] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const donationsRef = collection(db, "donations");
      const snapshot = await getDocs(donationsRef);

      const donationsData = [];
      let alternateSide = true;
      snapshot.forEach((doc) => {
        const data = doc.data();
        donationsData.push({
          side: alternateSide,
          imagePath: data.imageName,
          organization: data.orgName,
          total: data.totalDonated,
          donations: data.numDonations,
          description: data.description,
        });
        alternateSide = !alternateSide;
      });
      setDonationsInfo(donationsData);
    };

    fetchData();
  }, []);
  return donationsInfo
}

function DonationDisplay (props) {
  const donationsInfo = [
    { imagePath: org1Image, organization: 'Carolina Institute for Developmental Disabilities', total: 20, donations: 2, description: "The Carolina Institute for Developmental Disabilities is a comprehensive program for services, research, and training relevant to individuals with developmental disabilities and their families. The Carolina Institute provides a continuum of clinical services from complex, interdisciplinary evaluations on-site to more limited and selected clinical services and training in all 100 counties in North Carolina. The Institute brings together state-of-the-art research and clinical practice to ensure the best possible care for citizens of North Carolina." },
    { imagePath: org2Image, organization: 'UNC Center for Rehabilitative Care', total: 14, donations: 2, description: 'The mission of the UNC Inpatient Rehabilitation Center is to improve, restore and maintain functional abilities and maximize quality of life in patients with disabilities; educate health care professionals in rehabilitation care and services; and advance rehabilitation research. Rehabilitative care provides persons served with the skills and support necessary to function in an environment with as much independence and choice and as little supervision and restriction as possible. The totality of this care spans the rehabilitation continuum to optimize the functionality and quality of life and prevent and or treat conditions of physically disabled persons.' },
    { imagePath: org3Image, organization: "Levine Children's Hospital", total: 16, donations: 2, description: '' },
    { imagePath: org4Image, organization: 'Novant Health', total: 10, donations: 1, description: '' },
    { imagePath: org5Image, organization: 'Barton Pond Elementary School', total: 10, donations: 1, description: '' },
    { imagePath: org6Image, organization: 'Aversboro Elementary School', total: 10, donations: 1, description: '' }
  ]

  return (
    <Slide>
      {donationsInfo.map((donation) => (
        <DonationBox
          imagePath={donation.imagePath}
          organization={donation.organization}
          total={donation.total}
          donations={donation.donations}
          description={donation.description}
          side={donation.side}
        />
      ))}
    </Slide>
  );
}

export default function Donations() {
  const gofundmeform = "https://gofund.me/9dca4d2f";
  const formUrl1 =
    "https://docs.google.com/forms/d/e/1FAIpQLSfOhVwyU37XieVYEo73C-MyJ1XbY_Hfcy-VB3D31d7F2Tf0Qg/viewform";
  const formUrl2 =
    "https://docs.google.com/forms/d/e/1FAIpQLSfACZzhpliXiEolrF0IDf89XFW_RHx7DaSZkDeDLLF618HE1A/viewform";
  return (
    <>
      <Banner imagePath={bannerImage} title="Donations" />
      <h2>
        Donations
      </h2>
      <iframe
        src={gofundmeform}
        id="gfm-form"
        title="gofundme form"
        style={{ width: "80%", height: "676px", overflow: "scroll" }}
      ></iframe>
      <h2 style={{ paddingTop: "100px" }}>
        <b>Past Donation Sites</b>
      </h2>
      <DonationDisplay />
      <div id="pastpartnersection">
        <h3>
          <b>Past Partners</b>
        </h3>
        <ul>
          <li>Autism Society of North Carolina</li>
          <li>OT for Wake County Public Schools</li>
        </ul>
        <p>
          <em>Donation data collection began in Spring 2021.</em>
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <h1 style={{ marginTop: "25px" }}>Donation Forms</h1>
        <div
          className="donation-forms-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "50px",
            width: "80%",
          }}
        >
          <div className="donation-form" style={{ width: "80%" }}>
            <h2 style={{ marginBottom: "15px" }}>Want to Get:</h2>
            <iframe
              title="Donation Form 1"
              src={formUrl1}
              style={{ width: "100%", height: "350px", border: "none" }}
            />
          </div>
          <div className="donation-form" style={{ width: "80%" }}>
            <h2 style={{ marginBottom: "15px" }}>Want to Give:</h2>
            <iframe
              title={"Donation Form 2"}
              src={formUrl2}
              style={{ width: "100%", height: "350px", border: "none" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
