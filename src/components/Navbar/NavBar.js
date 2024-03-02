import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import formatAndFetchString from "../../helper-functions/lowercase-and-remove-non-alph";
import About from "../../pages/About";
import Admin from "../../pages/Admin";
import Checkout from "../../pages/Checkout";
import Contact from "../../pages/Contact";
import Donations from "../../pages/Donations";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import MediaCoverage from "../../pages/MediaCoverage";
import Toys from "../../pages/Toys";
import ShoppingCart from "./ShoppingCart";
import { FaHandHoldingHeart } from "react-icons/fa";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../../firebase-config";

import "./Navbar.css";

function CartItem(props) {
  const recentToys = JSON.parse(localStorage.getItem("recentToys"));
  const [quantity, setQuantity] = useState(props.toy.quantity);
  const [disable, setDisable] = useState(quantity === 1);
  const toyName = props.toy.name;

  const toy = recentToys.find((item) => item.name === toyName);

  const addOne = () => {
    let tempOrder = [...props.order];
    tempOrder[props.index].quantity++;
    setQuantity(tempOrder[props.index].quantity);
    setDisable(false);
    props.setOrder(tempOrder);

    for (let i = tempOrder.length - 1; i >= 0; i--) {
      if (tempOrder[i].quantity === 0) {
        tempOrder.splice(i, 1);
      }
    }
    const orderString = JSON.stringify(tempOrder);
    localStorage.setItem("cartObject", orderString);
  };

  const removeOne = () => {
    let tempOrder = [...props.order];
    tempOrder[props.index].quantity--;
    setQuantity(tempOrder[props.index].quantity);
    if (quantity === 1) {
      setDisable(true);
    }
    props.setOrder(tempOrder);

    for (let i = tempOrder.length - 1; i >= 0; i--) {
      if (tempOrder[i].quantity === 0) {
        tempOrder.splice(i, 1);
      }
    }
    const orderString = JSON.stringify(tempOrder);
    localStorage.setItem("cartObject", orderString);
  };

  const removeItem = () => {
    let tempOrder = [...props.order];
    tempOrder[props.index].quantity = 0;
    setQuantity(0);
    props.setOrder(tempOrder);

    for (let i = tempOrder.length - 1; i >= 0; i--) {
      if (tempOrder[i].quantity === 0) {
        tempOrder.splice(i, 1);
      }
    }
    const orderString = JSON.stringify(tempOrder);
    localStorage.setItem("cartObject", orderString);
  };

  return (
    <>
      {quantity !== 0 && (
        <div className="cart-item-container">
          <div className="colbreak" />
          <img
            src={toy.imagePath}
            className="item-picture"
            alt={toy.altText}
          ></img>
          <div className="colbreak" />
          <div className="item-details">
            <div className="item-descriptors">
              <p className="item-title">{toyName}</p>
              <p className="item-description">{toy.description}</p>
            </div>

            <div className="item-buttons" style={{ display: "inline-flex" }}>
              <span>
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    margin: "0",
                    padding: "0",
                  }}
                  onClick={() => removeItem()}
                >
                  <FaTrash size={20} style={{ marginRight: "10px" }} />
                </button>
                <span
                  style={{
                    minWidth: "60%",
                    maxWidth: "60%",
                    alignItem: "center",
                    backgroundColor: "#AAAAAA",
                    padding: "5px",
                    borderRadius: "300px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                  }}
                >
                  <button
                    style={{
                      margin: "0",
                      padding: "0",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    onClick={() => removeOne()}
                    disabled={disable}
                  >
                    <FaMinus size={15} />
                  </button>
                  <b style={{ marginRight: "25px", marginLeft: "25px" }}>
                    {quantity}
                  </b>
                  <button
                    style={{
                      margin: "0",
                      padding: "0",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    onClick={() => addOne()}
                  >
                    <FaPlus size={15} />
                  </button>
                </span>
              </span>
            </div>
            <div className="rowbreak" />
          </div>
          <div className="colbreak" />
        </div>
      )}
    </>
  );
}

function ShoppingCartPanel(props) {
  const closeShoppingCart = () => {
    document.body.style.overflow = "auto";
    props.setShoppingCartActive(false);
  };

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      let totalQuantity = 0;
      props.order.forEach((toy) => {
        totalQuantity += toy.quantity;
      });
      return totalQuantity;
    };
    setTotal(getTotal());
  }, [props.order]);

  const placeOrder = async (order) => {
    // loop through order backwards and if object at index has quantity 0, remove it
    for (let i = order.length - 1; i >= 0; i--) {
      if (order[i].quantity === 0) {
        order.splice(i, 1);
      }
    }
    const orderString = JSON.stringify(order);
    localStorage.setItem("cartObject", orderString);
    window.location.href = "/checkout";
  };

  return (
    <div className="shopping-cart-container">
      <div
        className="disable-interaction"
        onClick={() => closeShoppingCart()}
      ></div>
      <div className="shopping-cart-panel">
        <div className="close-cart">
          <button
            onClick={() => closeShoppingCart()}
            style={{
              margin: "10px",
              backgroundColor: "transparent",
              border: "none",
              float: "right",
            }}
          >
            <GrClose size={35} />
          </button>
        </div>
        {total === 0 ? (
          <div className="empty-cart">
            <p className="empty-message">
              Cart is empty. Add items to your order in the catalog.
            </p>
          </div>
        ) : (
          <div className="cart-items">
            {props.order.map(
              (toy, index) =>
                toy.quantity !== 0 && (
                  <CartItem
                    index={index}
                    toy={toy}
                    order={props.order}
                    setOrder={props.setOrder}
                  />
                )
            )}
          </div>
        )}
        <div
          className="checkout-container"
          style={{ flex: 2, display: "flex", justifyContent: "center" }}
        >
          {total !== 0 ? (
            <button
              className="checkout"
              onClick={() => placeOrder(props.order)}
            >
              Checkout
            </button>
          ) : (
            <button disabled className="checkout">
              Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function NavBar() {
  const [activeTab, setActiveTab] = useState(window.location.pathname);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [shoppingCartActive, setShoppingCartActive] = useState(false);
  const [total, setTotal] = useState(0);

  // if cartObject in localStorage is not null, set order to the cartObject
  const cartObject = JSON.parse(localStorage.getItem("cartObject"));
  const [order, setOrder] = useState(cartObject ? cartObject : []);
  // const [order, setOrder] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleClick = (path) => {
    setActiveTab(path);
    setSidebarOpen(false);
  };
  const getClassName = (path) => {
    return path === activeTab ? "mx-3 nav-link-active" : "mx-3 nav-link";
  };

  useEffect(() => {
    const storedActiveTab = localStorage.getItem("activeTab");
    if (storedActiveTab) {
      setActiveTab(storedActiveTab);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(
        (prevScrollPos > currentScrollPos &&
          prevScrollPos - currentScrollPos > 170) ||
          currentScrollPos < 30
      );
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    const getTotal = () => {
      setTotal(0);
      const totalQuantity = order.reduce((acc, toy) => acc + toy.quantity, 0);
      setTotal(totalQuantity);
    };
    getTotal();
  }, [order]);

  const openShoppingCart = () => {
    document.body.style.overflow = "hidden";
    setShoppingCartActive(true);
  };

  const changeOrder = (n) => {
    setOrder(n);
  };

  return (
    <>
      <Router>
        {window.location.pathname !== "/admin" &&
          window.location.pathname !== "/checkout" && (
            <Container fluid className="nav-container">
              <Navbar
                className={` navbar ${
                  visible ? "navbar-show" : "navbar-hide"
                } ${
                  activeTab === "/" || activeTab === "/login"
                    ? "home-page-navbar"
                    : ""
                }`}
                expand="lg"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Navbar.Brand
                  className="nav-brand"
                  style={{ marginLeft: "20px" }}
                >
                  {/* new navbar */}
                  <Navbar.Toggle
                    style={{ backgroundColor: "transparent" }}
                    id="collapsed-menu-icon"
                    className="toggle-button"
                    aria-controls="basic-navbar-nav"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSidebar();
                    }}
                  />
                  <img className="nav-logo" src="logo.png" alt=""></img>
                  CATCH
                </Navbar.Brand>
                {/* old nav */}
                <div
                  className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}
                  style={{ marginLeft: "0px", marginRight: "0px" }}
                >
                  <button onClick={toggleSidebar} className="closebtn">
                    &times;
                  </button>
                  <Nav
                    className="mx-auto"
                    style={{ paddingLeft: "0", marginLeft: "0" }}
                  >
                    <Nav.Link
                      className={getClassName("/")}
                      as={Link}
                      to={"/"}
                      onClick={() => handleClick("/")}
                    >
                      Home
                    </Nav.Link>
                    <Nav.Link
                      className={getClassName("/about")}
                      as={Link}
                      to={"/about"}
                      onClick={() => handleClick("/about")}
                    >
                      About
                    </Nav.Link>
                    <Nav.Link
                      className={getClassName("/toys")}
                      as={Link}
                      to={"/toys"}
                      onClick={() => handleClick("/toys")}
                    >
                      Toy Catalog
                    </Nav.Link>
                    <Nav.Link
                      className={getClassName("/donations")}
                      as={Link}
                      to={"/donations"}
                      onClick={() => handleClick("/donations")}
                    >
                      Donations
                    </Nav.Link>
                    <Nav.Link
                      className={getClassName("/mediacoverage")}
                      as={Link}
                      to={"/mediacoverage"}
                      onClick={() => handleClick("/mediacoverage")}
                    >
                      Media
                    </Nav.Link>
                    <Nav.Link
                      className={getClassName("/contact")}
                      as={Link}
                      to={"/contact"}
                      onClick={() => handleClick("/contact")}
                    >
                      Contact
                    </Nav.Link>
                  </Nav>
                </div>

                <Nav className="ml-auto justify-content-end adjust-right-nav" style={{display: "inline", marginLeft: "0"}}>
                  <a href="https://gofund.me/9dca4d2f" target="_blank" rel="noopener noreferrer">
                    <FaHandHoldingHeart color={"white"} size={30} style={{marginRight: "10px"}}/>
                  </a>
                  <button
                    onClick={() => openShoppingCart()}
                    className="shopping-button"
                  >
                    <ShoppingCart quantity={total} />
                  </button>
                </Nav>
              </Navbar>
            </Container>
          )}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/toys"
              element={<Toys order={order} setOrder={changeOrder} />}
            />
            <Route path="/donations" element={<Donations />} />
            <Route path="/mediacoverage" element={<MediaCoverage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
      {shoppingCartActive && (
        <ShoppingCartPanel
          order={order}
          setOrder={changeOrder}
          setShoppingCartActive={setShoppingCartActive}
        />
      )}
    </>
  );
}

export const placeOrder = async (order, userData) => {
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
    orderTime: serverTimestamp(),
    order: orderFormat,
    name: userData.name,
    email: userData.email,
    organization: userData.organization,
    buttonQuantity: userData.buttonQuantity,
    address: userData.address,
    notes: userData.notes,
  };
  try {
    const orderRef = await addDoc(collection(db, "orders"), orderData);
    const toysUpdateRef = doc(db, "lastUpdated", "toysLastUpdated");

    const toyNames = Object.keys(orderFormat);
    for (let i = 0; i < toyNames.length; i++) {
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
