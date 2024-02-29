import { doc, getDoc, serverTimestamp, updateDoc } from "@firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
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

    // Document data
    const mailData = {
      message: {
        subject: userData.name + " just placed an order!",
        text: "text content",
        html:
          "Organization: " +
          userData.organization +
          ", # of buttons: " +
          userData.buttonQuantity +
          ", Address: " +
          userData.address +
          ", Notes: " +
          userData.notes +
          ", User Email: " +
          userData.email,
      },
      to: [userData.email],
    };

    try {
      const docRef = await addDoc(mailCollection, mailData);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const [cartItems, setCartItems] = useState([]);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  useEffect(() => {
    try {
      const storedJsonString = localStorage.getItem("cartObject");
      // Keep for now
      // console.log(storedJsonString);
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
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  // Function to handle quantity increase
  const handleIncreaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  // Function to remove an item from the cart
  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
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

  return (
    <>
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
                      <Card.Img variant="top" src={item.imageSrc} />
                    </Col>
                    <Col sm={8}>
                      <Card.Title className="text-left">{item.name}</Card.Title>
                      <Card.Text className="text-left">
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
