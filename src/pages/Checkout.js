
import React from 'react';
import { Col, Row, Container, Button, Form, Card } from 'react-bootstrap';

export default function Checkout() {
  const cartItems = [
    { id: 1, name: 'Item 1', quantity: 2 },
    { id: 2, name: 'Item 2', quantity: 1 },
  ];

  return (
    <>
      <Container>
        <Row className="my-4">
          <Col md={6}>
            <h2>Cart</h2>
            <p>Please check your cart before proceeding</p>
            {cartItems.map((item) => (
              <Card key={item.id} className="mb-3">
                <Card.Body>
                  <Row>
                    <Col sm={4}>
                      {/* Replace with actual item image */}
                      <Card.Img variant="top" src="path-to-your-image.jpg" />
                    </Col>
                    <Col sm={8}>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>
                        {item.description}
                      </Card.Text>
                      <Card.Text>
                        Quantity: {item.quantity}
                      </Card.Text>
                      {/* Add functionality to buttons as required */}
                      <Button variant="outline-secondary">-</Button>
                      <span>{item.quantity}</span>
                      <Button variant="outline-secondary">+</Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col md={6}>
            <h2>Enter your Information:</h2>
            <Form>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your full name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="Street address, City, State, Zip code" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formNotes">
                <Form.Label>Additional Notes</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Anything else you'd like to add?" />
              </Form.Group>

              <Button variant="success" type="submit" size="lg">
                Submit Order
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
