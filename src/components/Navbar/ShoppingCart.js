import React from "react";
import { Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";

import "./ShoppingCart.css";

export default function ShoppingCart(props) {
  const badgeStyle = {
    position: "absolute",
    marginTop: "-3px",
    marginLeft: "-7px",
    fontSize: "10px",
    padding: "0.35em 0.5em 0.25em",
  };

  return (
    <>
      <FaShoppingCart
        style={{ backgroundColor: "transparent" }}
        className="shopping-cart"
        color="white"
        size={25}
      />
      {props.quantity === 0 ? (
        <></>
      ) : (
        <Badge pill bg="primary" style={badgeStyle}>
          {props.quantity}
        </Badge>
      )}
    </>
  );
}
