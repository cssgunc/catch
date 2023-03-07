import React, {useState, useEffect} from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Toys from '../pages/Toys';
import Donations from '../pages/Donations';
import News from '../pages/News';
import ShoppingCart from './ShoppingCart';
import Account from './Account';
import './Navbar.css';

export default function NavBar() {
    const [activeTab, setActiveTab] = useState('');
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const handleClick = (path) => {
      setActiveTab(path);
    };

    const getClassName = (path) => {
      if (activeTab === '/about' || activeTab === '/toys' || activeTab === '/donations' || activeTab === '/news') {
        return path === activeTab ? "mx-3 nav-link-alternate-active" : "mx-3 nav-link-alternate";
      }
      else {
        return path === activeTab ? "mx-3 nav-link-active" : "mx-3 nav-link";
      }
    };

    useEffect(() => {
      const storedActiveTab = localStorage.getItem('activeTab');
      if (storedActiveTab) {
          setActiveTab(storedActiveTab);
      }
    }, []);

    useEffect(() => {
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab]);

    useEffect(() => {
      const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 170) || currentScrollPos < 30);
        setPrevScrollPos(currentScrollPos);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);
    

    return (
      <Router>
        <Navbar className={`bg-transparent mx-3 navbar ${visible ? 'navbar-show' : 'navbar-hide'}`} expand="lg">
            <Navbar.Brand className={activeTab === '/about' || activeTab === '/toys' || activeTab === '/donations' || activeTab === '/news' ? "nav-brand-alternate" : "nav-brand"} as={Link} to={"/"} onClick={() => handleClick('/')}>
              <img className="nav-logo" src={require('../images/logo.png')} alt=""></img>CATCH
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="collapse-nav" id="basic-navbar-nav">
                <Nav className="mx-auto">
                  <Nav.Link className={getClassName("/")} as={Link} to={"/"} onClick={() => handleClick('/')}>Home</Nav.Link>
                  <Nav.Link className={getClassName("/about")} as={Link} to={"/about"} onClick={() => handleClick('/about')}>About</Nav.Link>
                  <Nav.Link className={getClassName("/toys")} as={Link} to={"/toys"} onClick={() => handleClick('/toys')}>Toy Catalog</Nav.Link>
                  <Nav.Link className={getClassName("/donations")} as={Link} to={"/donations"} onClick={() => handleClick('/donations')}>Donations</Nav.Link>
                  <Nav.Link className={getClassName("/news")} as={Link} to={"/news"} onClick={() => handleClick('/news')}>News</Nav.Link>
                  {/* <Nav.Link className={getClassName("/contact")} as={Link} to={"/contact"} onClick={() => handleClick('/contact')}>Contact</Nav.Link> */}
                </Nav>
            </Navbar.Collapse>
            <Nav className="ml-auto justify-content-end adjust-width">
                  <Account 
                    alternate={activeTab === '/about' || activeTab === '/toys' || activeTab === '/donations' || activeTab === '/news' ? true : false}
                  />
                  <ShoppingCart 
                    alternate={activeTab === '/about' || activeTab === '/toys' || activeTab === '/donations' || activeTab === '/news' ? true : false}
                    quantity={2}
                  />
            </Nav>
        </Navbar>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/toys" element={<Toys />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/news" element={<News />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </div>
      </Router>
    );
}
