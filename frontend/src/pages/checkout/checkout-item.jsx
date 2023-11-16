
import React, { useContext } from "react";

import { ShopContext } from "../../context/shop-context";
import { useNavigate } from "react-router-dom";

export const CheckoutItem = (props) => {
  const {  productName, price } = props.data;
  const id = props.data._id
  const cartItems = props.cartItems


//   const { cartItems, addToCart, removeFromCart, updateCartItemCount } =  useContext(ShopContext);

  return (
    <div className="cartItem">
      {/* <img src={productImage} /> */}
      <div className="description"> 
        <p>
          <b>{productName}</b> 
        </p>
        <p> Price: ${price}</p>
        <p>Amt: {cartItems[id]}</p>
      


      </div>
    </div>
  );
};

