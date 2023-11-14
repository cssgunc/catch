import React, {useState, useEffect} from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr'
import Home from '../../pages/Home';
import About from '../../pages/About';
import Toys from '../../pages/Toys';
import Donations from '../../pages/Donations';
import MediaCoverage from '../../pages/MediaCoverage';
import Admin from '../../pages/Admin';
import ShoppingCart from './ShoppingCart';
import { recentToys } from '../toyInfo';

import { db } from '../../firebase-config'; // Fixing the import path
import { addDoc, collection, getDoc, doc, updateDoc, serverTimestamp } from '@firebase/firestore'; // importing Firestore functions

import './Navbar.css';

function CartItem(props) {

  const [quantity, setQuantity] = useState(props.toy.quantity)
  const [disable, setDisable] = useState(quantity === 1)
  const toyName = props.toy.name;
  const toy = recentToys.find(item => item.name === toyName)

  const addOne = () => {
    let tempOrder = [...props.order];
    tempOrder[props.index].quantity++;
    setQuantity(tempOrder[props.index].quantity);
    setDisable(false);
    props.setOrder(tempOrder);
  };

  const removeOne = () => {
    let tempOrder = [...props.order];
    tempOrder[props.index].quantity--;
    setQuantity(tempOrder[props.index].quantity);
    if(quantity === 1) {
      setDisable(true)
    }
    props.setOrder(tempOrder);
  };

  const removeItem = () => {
    let tempOrder = [...props.order];
    tempOrder[props.index].quantity = 0;
    setQuantity(0);
    props.setOrder(tempOrder);
  };

  

  return(
    <>
    {(quantity !== 0) && 
    <div className='cart-item-container'>
      <div className='colbreak'/>
      <img src={toy.imagePath} className='item-picture' alt={toy.altText}></img>
      <div className='colbreak'/>
      <div className='item-details'>
        <div className="item-descriptors">
          <p className='item-title'>{toyName}</p>
          <p className="item-description">{toy.description}</p>
        </div>
      
        <div className="item-buttons" style={{display:"inline-flex"}}>
          <span>
            <button style={{backgroundColor:"transparent", border:"none", margin:"0", padding:"0"}}onClick={() => removeItem()}><FaTrash size={20} style={{marginRight:"10px"}}/></button>
            <span style={{minWidth:"60%", maxWidth:"60%", alignItem:"center", backgroundColor:"#AAAAAA", padding: "5px", borderRadius: "300px", paddingLeft: "15px", paddingRight: "15px"}}>
              <button style={{margin:"0", padding:"0", backgroundColor:"transparent", border:"none"}} onClick={() => removeOne()} disabled={disable}><FaMinus size={15}/></button>
              <b style={{marginRight:"25px", marginLeft:"25px"}}>{quantity}</b>
              <button style={{margin:"0", padding:"0", backgroundColor:"transparent", border:"none"}} onClick={() => addOne()}><FaPlus size={15}/></button>
            </span>
          </span>
        </div>
        <div className='rowbreak'/>
      </div>
      <div className='colbreak'/>
    </div>
}
    </>
  );
}

function ShoppingCartPanel(props) {

  const closeShoppingCart = () => {
    props.setShoppingCartActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", closeShoppingCart); // add event listener
    return () => {
        window.removeEventListener("scroll", closeShoppingCart); // clean up
    }
  }, []);

  const placeOrder = async (order) => {
    // Remove toy-quantity pairs where quantity is 0
    let orderFormat = {}
    for (let toy in order) {
      if (order[toy].quantity === 0) {
        delete order[toy];
      } else {
        orderFormat[order[toy].name] = order[toy].quantity
      }
    }

    // Write to the "orders" collection
    const orderData = {
      completed: false,
      orderTime: serverTimestamp(), // using Firestore server timestamp
      order: orderFormat
    };
    try {
      // Create new document in orders collection
      const orderRef = await addDoc(collection(db, "orders"), orderData);
      const toysUpdateRef = doc(db, 'lastUpdated', 'toysLastUpdated');
      // Update the ordered field for each toy in the "toys" collection
      const toyNames = Object.keys(orderFormat)
      for (let i = 0; i < toyNames.length; i++) {
        const toyName = toyNames[i].replace(/\W/g, '').toLowerCase();
        const toyRef = doc(db, "toys", toyName);

        const element = await getDoc(toyRef)
        const toyData = {...element.data()}
        await updateDoc(toyRef, {
          ordered: toyData.ordered + (orderFormat[toyNames[i]])
        });
      }
      
      await updateDoc(toysUpdateRef, {toysLastUpdated: serverTimestamp()});
    } catch (e) {
      console.error("Error placing order: ", e);
    }
  };

  return(
    <div className='shopping-cart-container'>
      <div className='disable-interaction' onClick={() => closeShoppingCart()}></div>
      <div className='shopping-cart-panel'>
        <div className='close-cart'>
          <button onClick={() => closeShoppingCart()} style={{margin: "10px", backgroundColor:"transparent", border:"none", float:"right"}}>
            <GrClose size={35}/>
          </button>
        </div>
        <div className='cart-items'>
          {props.order.map((toy, index) => (
            (toy.quantity !== 0) && <CartItem
              index={index}
              toy={toy}
              order={props.order}
              setOrder={props.setOrder}
            />
          ))}
        </div>
        <div className='checkout-container' style={{flex: 2, display:"flex", justifyContent:"center"}}>
          <button className='checkout'  onClick={() => placeOrder(props.order)}>Checkout</button>
        </div>
      </div>
    </div>
  );

}

export default function NavBar() {
    const [activeTab, setActiveTab] = useState('/');
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [shoppingCartActive, setShoppingCartActive] = useState(false);
    const [total, setTotal] = useState(0);

    const [order, setOrder] = useState([]);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };    


    const handleClick = (path) => {
      setActiveTab(path);
      setSidebarOpen(false); // Close the sidebar
    };
    const getClassName = (path) => {
      return path === activeTab ? "mx-3 nav-link-active" : "mx-3 nav-link";
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

    useEffect(() => {
      const getTotal = () => {
        setTotal(0)
        const totalQuantity = order.reduce((acc, toy) => acc + toy.quantity, 0);
        setTotal(totalQuantity);
      }
      getTotal()
    }, [order])

    const openShoppingCart = () => {
      console.log('activate click');
      setShoppingCartActive(true);
    };

    const changeOrder = (n) => {
      setOrder(n);
    };


    

    return (
      <>
      <Router>
      <Container fluid className="nav-container">
      <Navbar className={` navbar ${visible ? 'navbar-show' : 'navbar-hide'} ${activeTab === '/' ? 'home-page-navbar' : ''}`} expand="lg" style={{ display: 'flex', justifyContent: 'space-between' }}>
          
          <Navbar.Brand className="nav-brand" style={{ marginLeft: '20px' }}>
              {/* new navbar */}
              <Navbar.Toggle className="collapsed-menu-icon" class="toggle-button" aria-controls="basic-navbar-nav" onClick={(e) => { e.stopPropagation(); toggleSidebar(); }} />

              <img className="nav-logo" src={require('../../images/logo.png')} alt=""></img>CATCH
            </Navbar.Brand>
            {/* old nav */}
            <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`} style={{ marginLeft: '0px', marginRight: '0px' }}>
              <button onClick={toggleSidebar} className="closebtn">&times;</button>
              <Nav className="mx-auto" style={{ paddingLeft: '0', marginLeft: '0' }}>
                <Nav.Link className={getClassName("/")} as={Link} to={"/"} onClick={() => handleClick('/')}>Home</Nav.Link>
                <Nav.Link className={getClassName("/about")} as={Link} to={"/about"} onClick={() => handleClick('/about')}>About</Nav.Link>
                <Nav.Link className={getClassName("/toys")} as={Link} to={"/toys"} onClick={() => handleClick('/toys')}>Toy Catalog</Nav.Link>
                <Nav.Link className={getClassName("/donations")} as={Link} to={"/donations"} onClick={() => handleClick('/donations')}>Donations</Nav.Link>
                <Nav.Link className={getClassName("/mediacoverage")} as={Link} to={"/mediacoverage"} onClick={() => handleClick('/mediacoverage')}>Media Coverage</Nav.Link>
                </Nav>
              </div>

              <Nav className="ml-auto justify-content-end adjust-right-nav">
                <button onClick={() => openShoppingCart()} className="shopping-button">
                  <ShoppingCart
                    quantity={total}
                  />
                </button>
              </Nav>
            </Navbar>
          </Container>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/toys" element={<Toys order={order} setOrder={changeOrder}/>} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/mediacoverage" element={<MediaCoverage />} />
            <Route path="/8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918" element={<Admin />} />
          </Routes>
        </div>
      </Router>
      {shoppingCartActive && 
        <ShoppingCartPanel order={order} setOrder={changeOrder} setShoppingCartActive={setShoppingCartActive}/>
      }
      </>
    );
}