import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";
import "../cart/cart.css"
import { CheckoutItem } from "./checkout-item";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../../hooks/useGetUserID";
import axios from "axios";


export const Checkout = () => {

  const {allProducts, cartItems, getTotalCartAmount } = useContext(ShopContext);

  const totalAmount = getTotalCartAmount()
  //nu more props
  //{}ing the blw vari gives error, cyuz {} is for destruct
  // const totalAmount  =props.totalAmount
  // const cartItems = props.cartItems
  // const allProducts = props.allProducts

  
  const userID = useGetUserID()
  const navigate = useNavigate()

  
  const handleCheckout= async(e)=>{

    // e.preventDefault()
    
    
    let productsArr = []
    
    for(const [productID, count] of Object.entries(cartItems)){

    
      //delete the property id and count if 0
      if(cartItems[productID] !== 0){

        productsArr.push({[productID]: count})

      }

      else{

        delete cartItems.productID
      }

      // productsArr.push({[productID]: count})

    }

  

    
    try {
      
      await axios.put(`http://localhost:5005/checkout/${userID}`,
         {productsArr, totalAmount})

      alert("purchased successful!")
        
      navigate("/")

    } catch (error) {
      console.error(error)
    }

 
  }



  return (
    <div className="cart">
        <div>
          <h1>Your Cart Items</h1>
        </div>
        <div className="cart">
          {allProducts.map((product) => {
            if (cartItems[product._id] !== 0 
              && cartItems[product._id] !== undefined) {

              return <CheckoutItem data={product}
               key={product._id}
                cartItems={cartItems}
               />;
            }
          })}
        </div>

          <div className="checkout">
            <p> Subtotal: ${totalAmount} </p>

                {/* button to go back to cart ot make adjustments */}

                {/* button for checkout with confirmation msg */}
        {/* <button onClick={()=>{handleCheckout}}> Pay Now</button> */}
        <button onClick={handleCheckout}> Pay Now</button>
              </div>
      </div>
    
  );
};

