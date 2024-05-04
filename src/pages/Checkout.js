import { doc, getDoc, serverTimestamp, updateDoc } from "@firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { FaTrashAlt, FaChevronLeft } from "react-icons/fa";
import { db } from "../firebase-config.js";
import formatAndFetchString from "../helper-functions/lowercase-and-remove-non-alph";
import "./Checkout.css";

// New component to handle quantity adjustments
const QuantitySelector = ({ quantity, onDecrease, onIncrease }) => {
  return (
    <div>
      <Button className="transparent-button" onClick={onDecrease}>
        -
      </Button>
      <span>{quantity}</span>
      <Button className="transparent-button" onClick={onIncrease}>
        +
      </Button>
    </div>
  );
};

export default function Checkout() {
  async function addMailDocument() {
    const mailCollection = collection(db, "mail");
  
    let emailItems = [];
  
    try {
      const storedJsonString = localStorage.getItem("cartObject");
      if (storedJsonString) {
        const storedObject = JSON.parse(storedJsonString);
        emailItems = storedObject.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          imageSrc: item.imagePath,
        }));
      }
    } catch (error) {
      console.error("Error retrieving data from local storage:", error);
    }
  
    console.log(emailItems);
  
    const orderItemsHTML = emailItems.map((item) => `
      <div>
        <img src="${item.imageSrc}" alt="${item.name}" style="max-width: 100px;">
        <p><strong>Name:</strong> ${item.name}</p>
        <p><strong>Quantity:</strong> ${item.quantity}</p>
      </div>
    `).join('');
  
    const confirmData = {
      message: {
        subject: "Order Confirmation",
        text: "text content",
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Confirmation</title>
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
              <h2><span class="icon">✅</span>Order Confirmation</h2>
              <p>Thank you for placing your order with CATCH! We have received your order and will confirm it shortly.</p>
              <p><strong>Organization:</strong> ${userData.organization}</p>
              <p><strong># of buttons:</strong> ${userData.buttonQuantity}</p>
              <p><strong>Address:</strong> ${userData.address}</p>
              <p><strong>Notes:</strong> ${userData.notes}</p>
              ${orderItemsHTML}
            </div>
          </body>
          </html>
        `,
      },
      to: [userData.email], // Send confirmation to the user who placed the order
    };
  
    const mailData = {
      message: {
        subject: userData.name + " just placed an order!",
        text: "text content",
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Order Notification</title>
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
              <h2><span class="icon">📦</span>New Order Notification</h2>
              <p><strong>Organization:</strong> ${userData.organization}</p>
              <p><strong># of buttons:</strong> ${userData.buttonQuantity}</p>
              <p><strong>Address:</strong> ${userData.address}</p>
              <p><strong>Notes:</strong> ${userData.notes}</p>
              <p><strong>User Email:</strong> ${userData.email}</p>
              ${orderItemsHTML}
            </div>
          </body>
          </html>        
        `,
      },
      to: ['catchUNC@gmail.com'],
    };    
  
    try {
      const docRef1 = await addDoc(mailCollection, mailData);
      const docRef2 = await addDoc(mailCollection, confirmData);
      console.log("Documents added successfully!");
    } catch (e) {
      console.error("Error adding documents: ", e);
    }
  }

  const [cartItems, setCartItems] = useState([]);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  

  useEffect(() => {
    try {
      const storedJsonString = localStorage.getItem("cartObject");
      if (storedJsonString) {
        const storedObject = JSON.parse(storedJsonString);
        let idCounter = 1;
        const newCartItems = storedObject.map((item) => ({
          id: idCounter++,
          name: item.name,
          quantity: item.quantity,
          imageSrc: item.imagePath,
          description: item.description,
        }));
        setCartItems(newCartItems);
      }
    } catch (error) {
      console.error("Error retrieving data from local storage:", error);
    }
  }, []);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    organization: "",
    buttonQuantity: 0,
    address: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Function to handle quantity decrease
  const handleDecreaseQuantity = (itemId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === itemId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
  
      // Update the cart in local storage
      const orderString = JSON.stringify(updatedItems);
      localStorage.setItem("cartObject", orderString);
  
      return updatedItems;
    });
  };

  // Function to handle quantity increase
const handleIncreaseQuantity = (itemId) => {
  setCartItems((prevItems) => {
    const updatedItems = prevItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    // Update the cart in local storage
    const orderString = JSON.stringify(updatedItems);
    localStorage.setItem("cartObject", orderString);

    return updatedItems;
  });
};

  // Function to remove an item from the cart
  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId);
  
      // Update the cart in local storage
      const orderString = JSON.stringify(updatedItems);
      localStorage.setItem("cartObject", orderString);
  
      return updatedItems;
    });
  };

  const placeOrder = async (order, userData) => {
    let orderFormat = {};
    for (let toy in order) {
      if (order[toy].quantity === 0) {
        delete order[toy];
      } else {
        orderFormat[order[toy].name] = order[toy].quantity;
      }
    }

    const orderData = {
      completed: false,
      orderTime: serverTimestamp(), // using Firestore server timestamp
      order: orderFormat,
      name: userData.name,
      email: userData.email,
      organization: userData.organization,
      buttonQuantity: userData.buttonQuantity,
      address: userData.address,
      notes: userData.notes,
    };
    try {
      // Create new document in orders collection
      const orderRef = await addDoc(collection(db, "orders"), orderData);
      const toysUpdateRef = doc(db, "lastUpdated", "toysLastUpdated");
      // Update the ordered field for each toy in the "toys" collection
      const toyNames = Object.keys(orderFormat);
      for (let i = 0; i < toyNames.length; i++) {
        // const toyName = toyNames[i].replace(/\W/g, '').toLowerCase();
        // const toyRef = doc(db, "toys", toyName);
        const toyRef = formatAndFetchString(toyNames[i]);

        const element = await getDoc(toyRef);
        const toyData = { ...element.data() };
        await updateDoc(toyRef, {
          ordered: toyData.ordered + orderFormat[toyNames[i]],
        });
      }

      await updateDoc(toysUpdateRef, { toysLastUpdated: serverTimestamp() });
    } catch (e) {
      console.error("Error placing order: ", e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    placeOrder(cartItems, userData);
    addMailDocument();

    setCartItems([]);
    // Optionally, you can clear the localStorage here as well
    localStorage.removeItem("cartObject");

    // Set orderSubmitted to true to display the success message
    setOrderSubmitted(true);
    // Clear user data
    setUserData({
      name: "",
      email: "",
      organization: "",
      buttonQuantity: 0,
      address: "",
      notes: "",
    });
    window.alert(
      "Thank You for Ordering! CATCH will review your order soon and let you know when it is confirmed!"
    );
  };

  const returnHome = () => {
    window.location.href = "/";
  };

  return (
    <>
      <button className="return-home" onClick={() => returnHome()}>
        <FaChevronLeft size={25} />
      </button>
      <Container>
        <Row className="my-4">
          <Col md={6}>
            <h2 className="text-left">Cart</h2>
            <p className="text-left">
              Please check your cart before proceeding
            </p>
            {cartItems.map((item) => (
              <Card key={item.id} className="mb-3">
                <Card.Body>
                  <Row>
                    <Col sm={4}>
                      <Card.Img src={item.imageSrc}  style={{height: "100%"}}/>
                    </Col>
                    <Col sm={8}>
                      <Card.Title className="text-left">{item.name}</Card.Title>
                      <Card.Text className="text-left" style={{textAlign: "justify"}}>
                        {item.description}
                      </Card.Text>
                      <div className="text-left d-flex align-items-center">
                        <FaTrashAlt
                          className="mr-2"
                          onClick={() => handleRemoveItem(item.id)}
                        />
                        {/* Use QuantitySelector component for quantity adjustments */}
                        <QuantitySelector
                          quantity={item.quantity}
                          onDecrease={() => handleDecreaseQuantity(item.id)}
                          onIncrease={() => handleIncreaseQuantity(item.id)}
                        />
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col md={6}>
            <h2 className="text-left">Enter your Information:</h2>
            <br></br>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 text-left" controlId="name">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  placeholder="Enter your full name"
                  value={userData.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3 text-left" controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  placeholder="Enter your email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3 text-left" controlId="organization">
                <Form.Label>Organization:</Form.Label>
                <Form.Control
                  placeholder="Enter your organization's name"
                  value={userData.organization}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3 text-left" controlId="buttonQuantity">
                <Form.Label>Number of Buttons for Toys:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="MAX 2 PER 3 TOYS"
                  value={userData.buttonQuantity}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3 text-left" controlId="address">
                <Form.Label>Address:</Form.Label>
                <Form.Control
                  placeholder="Street address, City, State, Zip code"
                  value={userData.address}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3 text-left" controlId="notes">
                <Form.Label>Additional Notes:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Anything else you'd like to add?"
                  value={userData.notes}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                variant="success"
                type="submit"
                size="lg"
                className="btn-block"
              >
                Submit Order
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
