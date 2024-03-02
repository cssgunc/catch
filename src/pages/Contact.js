import React from "react";
import { FaInstagram } from "react-icons/fa";
import Banner from "../components/Banner";
import "../pages/Contact.css";

export default function Contact() {
  const formUrl1 =
    "https://docs.google.com/forms/d/e/1FAIpQLScxZK_zEaEbWW7JXpFrBc4thdbnlCnwGx_OPIN4FZzcHPd2Ig/viewform";
  const addressMap =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3231.430527919442!2d-79.05104209999999!3d35.9119606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acc2e834da1a3d%3A0xb667aa33d3095f48!2sE%20Cameron%20Ave%2C%20Chapel%20Hill%2C%20NC%2027514%2C%20USA!5e0!3m2!1sen!2suk!4v1699371410891!5m2!1sen!2suk";
  return (
    <div className="App">
      <Banner imagePath="/banner/contact_banner_color.jpeg" title="Contact" />
      <h2>Reach Out to Us!</h2>
      <div id="mainContainer">
        <div id="leftCol">
          <iframe
            title="google map"
            src={addressMap}
            id="address-map"
            style={{
              style: "border:0;",
              allowfullscreen: "",
              loading: "lazy",
              referrerpolicy: "no-referrer-when-downgrade",
            }}
          />
          <div
            style={{
              paddingLeft: "5%",
              paddingRight: "5%",
              fontSize: "16px",
              marginBottom: "40px",
              marginTop: "40px",
            }}
          >
            <p>The University of North Carolina - Phillips Hall</p>
            <p>120 E Cameron Ave, Chapel Hill, NC 27514</p>
            <p>Room 19B (Basement)</p>
            <p>catchUNC@gmail.com</p>
          </div>

          <div
            class="socialLinks"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <a
              href="https://www.google.com/url?q=https%3A%2F%2Fheellife.unc.edu%2Forganization%2Fcatch&sa=D&sntz=1&usg=AOvVaw1nxSQeb3m8ASiGOrObjuDm"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://identity2.sites.unc.edu/wp-content/uploads/sites/885/2019/01/Old_Well_mark.png"
                alt="Heel Life"
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "20px",
                  objectFit: "cover",
                }}
              />
            </a>
            <a
              href="https://www.google.com/url?q=https%3A%2F%2Fgroupme.com%2Fjoin_group%2F70343961%2FYiXb3tpu&sa=D&sntz=1&usg=AOvVaw21HvyLE9K66PiNYUu7AfQ-"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="contact/groupme.jpg"
                alt="GroupMe"
                style={{ width: "50px", height: "50px", marginRight: "10px" }}
              />
            </a>
            <a
              href="https://www.google.com/url?q=https%3A%2F%2Fwww.instagram.com%2Fcatch_unc%2F&sa=D&sntz=1&usg=AOvVaw3XypaNVTy9lqvEh0_n8R2p"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram
                size={50}
                className="icon"
                color="#E1306C"
                style={{ marginRight: "10px" }}
              />
            </a>
          </div>

          <div
            class="logo"
            style={{
              display: "flex",
              marginTop: "40px",
              justifyContent: "center",
            }}
          >
            <img
              src="logo.png"
              style={{ width: "40%", height: "40%" }}
              alt="CATCH logo"
            ></img>
          </div>
        </div>

        <div id="rightCol">
          <iframe id="cont-form" title="Contact Form" src={formUrl1} />
        </div>
      </div>
    </div>
  );
}
