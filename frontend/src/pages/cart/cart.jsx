import React, {useState, useEffect, useContext} from 'react';

import { CartItem } from "./cart-item";

import { ShopContext } from '../../context/shop-context';
import "./cart.css"
import { useNavigate } from 'react-router-dom';

import { useGetUserID } from '../../hooks/useGetUserID';

export const Cart = ()=> {

  const {cartItems, getTotalCartAmount, allProducts} = useContext(ShopContext)   //NOT outside the fx
  const totalAmount = getTotalCartAmount()

  const navigate = useNavigate()

  
  // const userID = useGetUserID()
 
  

  return (
    <>
    
    <div className="cart">
        <div>
          <h1>Your Cart Items</h1>
        </div>
        <div className="cart">
          {allProducts.map((product) => {
            if (cartItems[product._id] !== 0 
              && cartItems[product._id] !== undefined) {

              return <CartItem data={product} key={product._id}/>;
            }
          })}
        </div>

      {totalAmount > 0?  <div className="checkout">
          <p> Subtotal: ${totalAmount} </p>
          <button onClick={()=> navigate("/")}> Continue Shopping </button>
          <button   onClick={()=> navigate("/checkout")}      > 
           Checkout Here
          </button>
          
        </div> 
        : <h1>    EMpyt cart</h1> }
       
          <div className='history'>
            <button onClick={()=> navigate("/history")}> View Order History </button>
          </div>
        </div>

        </>
      );
        
}
