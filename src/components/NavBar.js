import React, {  Component } from 'react';
import {Container, Nav, Navbar, NavDropdown, Button, Form} from 'react-bootstrap';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Toys from '../pages/Toys';
import Donations from '../pages/Donations';
import News from '../pages/News';
import Contact from '../pages/Contact';

import './Navbar.css'

export default class NavBar extends Component {
  
  render() {
    
    return (
      <Router>
        <Navbar className="header" expand="lg" >
            <Navbar.Brand className="justify-content-left" id="header-logo" as={Link} to={"/"}>
              <img className="nav-logo" src={require('../images/wordlesslogo.png')} alt="" /> CATCH
            </Navbar.Brand>
             <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="collapse-nav" id="basic-navbar-nav">
                <Nav className="ms-auto">
                <Nav.Link className="nav-link" as={Link} to={"/"}>Home</Nav.Link>
                <Nav.Link className="nav-link" as={Link} to={"/about"}>About</Nav.Link>
                <Nav.Link className="nav-link" as={Link} to={"/toys"}>Toy Catalog</Nav.Link>
                <Nav.Link className="nav-link" as={Link} to={"/donations"}>Donations</Nav.Link>
                <Nav.Link className="nav-link" as={Link} to={"/news"}>News</Nav.Link>
                <Nav.Link className="nav-link" as={Link} to={"/contact"}>Contact</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/toys" element={<Toys />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    )
  }
}

