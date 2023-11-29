// !!! There is some code for checkout that was written in navbar JS that is copied at the bottom of this file and commented out
// in case backend people want to repurpose it for this new page dedicated to placing an order
import React, { useEffect, useState } from 'react';
import { Col, Row, Container, Button, Form, Card } from 'react-bootstrap';

import imageSrcTest from '../images/logo.png' // Adjust the path as needed
import "./Checkout.css"
import { FaTrashAlt } from "react-icons/fa";



export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    try {
      const storedJsonString = localStorage.getItem('cartObject');
      if (storedJsonString) {
        const storedObject = JSON.parse(storedJsonString);
        let idCounter = 1;
        const newCartItems = storedObject.map(item => ({
          id: idCounter++,
          name: item.name,
          quantity: item.quantity,
          imageSrc: imageSrcTest,
          description: `Description for ${item.name}`
        }));
        setCartItems(newCartItems);
      }
    } catch (error) {
      console.error('Error retrieving data from local storage:', error);
      // Handle the error appropriately (e.g., log it, notify the user, etc.)
    }
  }, []); // Empty dependency array to run this effect only once on component mount


  return (
    <>
      <Container>
        <Row className="my-4">
          <Col md={6}>
            <h2 className='text-left'>Cart</h2>
            <p className='text-left'>Please check your cart before proceeding</p>
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
                      <div className="text-left">
                        <FaTrashAlt />
                        <Button className="transparent-button">-</Button>
                        <span>{item.quantity}</span>
                        <Button className="transparent-button">+</Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col md={6}>
            <h2 className='text-left'>Enter your Information:</h2>
            <br></br>
            <Form>
              <Form.Group className="mb-3 text-left" controlId="formName">
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter your full name" />
              </Form.Group>

              <Form.Group className="mb-3 text-left" controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>

              <Form.Group className="mb-3 text-left" controlId="formOrg">
                <Form.Label>Organization:</Form.Label>
                <Form.Control type="text" placeholder="Enter your organization's name" />
              </Form.Group>

              <Form.Group className="mb-3 text-left" controlId="formNumber">
              <Form.Label>Number of Buttons for Toys:</Form.Label>
              <Form.Control type="number" placeholder="MAX 2 PER 3 TOYS" />
              </Form.Group>

              <Form.Group className="mb-3 text-left" controlId="formAddress">
                <Form.Label>Address:</Form.Label>
                <Form.Control placeholder="Street address, City, State, Zip code" />
              </Form.Group>

              <Form.Group className="mb-3 text-left" controlId="formNotes">
                <Form.Label>Additional Notes:</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Anything else you'd like to add?" />
              </Form.Group>

              <Button variant="success" type="submit" size="lg" className="btn-block">
                Submit Order
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}


    // Remove toy-quantity pairs where quantity is 0
    // let orderFormat = {}
    // for (let toy in order) {
    //   if (order[toy].quantity === 0) {
    //     delete order[toy];
    //   } else {
    //     orderFormat[order[toy].name] = order[toy].quantity
    //   }
    // }

    // // Write to the "orders" collection
    // const orderData = {
    //   completed: false,
    //   orderTime: serverTimestamp(), // using Firestore server timestamp
    //   order: orderFormat
    // };
    // try {
    //   // Create new document in orders collection
    //   const orderRef = await addDoc(collection(db, "orders"), orderData);
    //   const toysUpdateRef = doc(db, 'lastUpdated', 'toysLastUpdated');
    //   // Update the ordered field for each toy in the "toys" collection
    //   const toyNames = Object.keys(orderFormat)
    //   for (let i = 0; i < toyNames.length; i++) {
    //     // const toyName = toyNames[i].replace(/\W/g, '').toLowerCase();
    //     // const toyRef = doc(db, "toys", toyName);
    //     const toyRef = formatAndFetchString(toyNames[i]);

    //     const element = await getDoc(toyRef)
    //     const toyData = { ...element.data() }
    //     await updateDoc(toyRef, {
    //       ordered: toyData.ordered + (orderFormat[toyNames[i]])
    //     });
    //   }

    //   await updateDoc(toysUpdateRef, { toysLastUpdated: serverTimestamp() });
    // } catch (e) {
    //   console.error("Error placing order: ", e);
    // }