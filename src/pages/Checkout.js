import React, { useEffect, useState } from 'react';
import { Col, Row, Container, Button, Form, Card } from 'react-bootstrap';
import imageSrcTest from '../images/logo.png';
import { placeOrder } from '../components/Navbar/NavBar.js';
import "./Checkout.css";
import { FaTrashAlt } from "react-icons/fa";

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
  const [cartItems, setCartItems] = useState([]);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  useEffect(() => {
    try {
      const storedJsonString = localStorage.getItem('cartObject');
      console.log(storedJsonString)
      if (storedJsonString) {
        const storedObject = JSON.parse(storedJsonString);
        let idCounter = 1;
        const newCartItems = storedObject.map(item => ({
          id: idCounter++,
          name: item.name,
          quantity: item.quantity,
          imageSrc: item.imagePath,
          description: item.description,
        }));
        setCartItems(newCartItems);
      }
    } catch (error) {
      console.error('Error retrieving data from local storage:', error);
      // Handle the error appropriately (e.g., log it, notify the user, etc.)
    }
  }, []);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    organization: '',
    buttonQuantity: 0,
    address: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [id]: value
    }));
  }

    // Function to handle quantity decrease
    const handleDecreaseQuantity = (itemId) => {
      setCartItems(prevItems => prevItems.map(item => {
        if (item.id === itemId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }));
    };
  
    // Function to handle quantity increase
    const handleIncreaseQuantity = (itemId) => {
      setCartItems(prevItems => prevItems.map(item => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      }));
    };

  // Function to remove an item from the cart
  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    placeOrder(cartItems, userData);
    setCartItems([]);
    // Optionally, you can clear the localStorage here as well
    localStorage.removeItem('cartObject');

    // Set orderSubmitted to true to display the success message
    setOrderSubmitted(true);
    window.alert("Thank You for Ordering! CATCH will review your order soon and let you know when it is confirmed!");
  }

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
                      <div className="text-left d-flex align-items-center">
                        <FaTrashAlt className="mr-2" onClick={() => handleRemoveItem(item.id)} />
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
            <h2 className='text-left'>Enter your Information:</h2>
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
