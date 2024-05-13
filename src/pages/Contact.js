import React from "react";
import { FaInstagram } from "react-icons/fa";
import Banner from "../components/Banner";
import { Formik, Field, Form } from "formik";
import "../pages/Contact.css";
import { db } from "../firebase-config";
import { doc, getDoc, serverTimestamp, updateDoc } from "@firebase/firestore";
import { addDoc, collection } from "firebase/firestore";

function ContactForm() {
  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.trim() === "") {
      errors.name = "Cannot have an empty name!";
    }

    if (!values.message) {
      errors.message = "Required";
    } else if (values.message.trim() === "") {
      errors.message = "Cannot have an empty message body!";
    }
    console.log(errors);
    return errors;
  };

  async function addMailDocument(values) {
    const mailCollection = collection(db, "mail");

    // Document data
    const mailData = {
      message: {
        subject: values.name + " just messaged you!",
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Message Notification</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f8f8f8;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              h2 {
                color: #007bff;
                margin-top: 0;
              }
              .icon {
                display: inline-block;
                vertical-align: middle;
                margin-right: 10px;
              }
              strong {
                color: #333;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2><span class="icon">✉️</span>New Message Notification</h2>
              <div style="color:black">
                <p><b>Name:</b> ${values.name}</p>
                <p><b>Email:</b> ${values.email}</p>
                <p><b><u>Message</u></b></p>
                <p>${values.message}</p>
              </div>
            </div>
          </body>
          </html>
        `,
      },
      to: ["catchUNC@gmail.com"],
    };    

    try {
      const docRef = await addDoc(mailCollection, mailData);
      alert("Sent message to CATCH!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div style={{ marginLeft: "10%", marginRight: "10%" }}>
      <h1 style={{ textAlign: "justify" }}>Get in Contact!</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          message: "",
        }}
        // onSubmit={async (values) => {
        //   await new Promise((r) => setTimeout(r, 500));
        //   alert(JSON.stringify(values, null, 2));
        // }}
        // make onSubmit pass values to addMailDocument
        onSubmit={(values, { resetForm }) => {
          addMailDocument(values);
          resetForm();
        }}
        validate={validate}
        validateOnChange={false}
        validateOnBlur={false}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          border: "1px solid black",
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <label htmlFor="name" className="field-label">
              Name
            </label>
            <Field id="name" name="name" placeholder="Enter your name..." />
            {touched.name && errors.name && (
              <div className="error-message">{errors.name}</div>
            )}

            <label htmlFor="email" className="field-label">
              Email
            </label>
            <Field
              id="email"
              name="email"
              placeholder="Enter your email..."
              type="email"
            />
            {touched.email && errors.email && (
              <div className="error-message">{errors.email}</div>
            )}

            <label htmlFor="message" className="field-label">
              Message
            </label>
            <Field
              id="message"
              name="message"
              placeholder="Enter your message for CATCH here..."
              component="textarea"
            />
            {touched.message && errors.message && (
              <div className="error-message">{errors.message}</div>
            )}
            <button type="submit" className="message-btn">
              Send Message
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default function Contact() {
  const formUrl1 =
    "https://docs.google.com/forms/d/e/1FAIpQLScxZK_zEaEbWW7JXpFrBc4thdbnlCnwGx_OPIN4FZzcHPd2Ig/viewform";
  const addressMap =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3231.430527919442!2d-79.05104209999999!3d35.9119606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acc2e834da1a3d%3A0xb667aa33d3095f48!2sE%20Cameron%20Ave%2C%20Chapel%20Hill%2C%20NC%2027514%2C%20USA!5e0!3m2!1sen!2suk!4v1699371410891!5m2!1sen!2suk";
  return (
    <div>
      <Banner imagePath="/banner/contact_banner_color.jpeg" title="Contact" />
      <div className="info-container">
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
              <a
                href="mailto:catchUNC@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "blue" }}
              >
                catchUNC@gmail.com
              </a>
            </div>

            <div
              class="socialLinks"
              style={{ display: "flex", justifyContent: "center" }}
            >
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
              <a
                href="https://www.google.com/url?q=https%3A%2F%2Fheellife.unc.edu%2Forganization%2Fcatch&sa=D&sntz=1&usg=AOvVaw1nxSQeb3m8ASiGOrObjuDm"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/contact/heellife.jpg"
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
                  src="/contact/groupme.jpg"
                  alt="GroupMe"
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
              </a>
            </div>
          </div>

          <div id="rightCol">
            <ContactForm />
            <div
              class="logo"
              style={{
                display: "flex",
                marginTop: "40px",
                justifyContent: "center",
              }}
            >
              <img
                src="/logo.png"
                style={{ width: "40%", height: "40%" }}
                alt="CATCH logo"
              ></img>
            </div>
            {/* <iframe id="cont-form" title="Contact Form" src={formUrl1} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
