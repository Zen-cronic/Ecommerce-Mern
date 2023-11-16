import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const CartItem = (props) => {
  const {  productName, price } = props.data;
  const id = props.data._id
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =  useContext(ShopContext);

  return (
    <div className="cartItem">
      {/* <img src={productImage} /> */}
      <div className="description"> 
        <p>
          <b>{productName}</b> 
        </p>
        <p> Price: ${price}</p>
        <div className="countHandler">

          <button onClick={() => removeFromCart(id)}>-</button>
          <input 
          value = {cartItems[id]}  
          onChange={e => updateCartItemCount(e.target.value, id)}></input>
          <button onClick={()=>addToCart(id)}>+</button>


        </div>
    
      </div>
    </div>
  );
};

