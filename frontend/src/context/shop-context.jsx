import React, {useEffect, useState, createContext} from 'react';

import {  getProducts } from './context-api';


export const ShopContext = createContext(null)

export const ShopContextProvider = ( props)=>{

 
  const [allProducts, setAllProducts] = useState([])
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    async function fetchProducts () {
    
      const allProductsArr = await getProducts()
      setAllProducts(allProductsArr)
    }
    fetchProducts()

    //allProducts cannot be a dep, otherwise inifinite render
  }, []);
 
 
 




  const addToCart  = (itemID) =>{

    setCartItems((prev) =>    {
      return {...prev, [itemID] : prev[itemID] ===undefined? 1: prev[itemID]+ 1}})


  }

  const removeFromCart  = (itemID) =>{

    setCartItems((prev) =>    (
        {...prev, [itemID] : prev[itemID] - 1}))

        //thsi DNW cuz removeFromCart disappers when cartItem[itemID] is 0
       //prev[itemID] === 0 | 1? delete cartItems[itemID]: 
  }

  const updateCartItemCount = (newAmount, itemID) =>{

    setCartItems(prev => 
      ({...prev, [itemID]: newAmount}))
  }

 

  //au getTTl
  const getTotalCartAmount= () =>{

    let totalAmount = 0
    
    for(const item in cartItems){  //diff to of 

      if(cartItems[item] > 0 ) {

        //
        let itemInfo = allProducts.find(product => (product._id === item))
            
        totalAmount += itemInfo.price * cartItems[item]
      }
    }
    return totalAmount
  }
  const contextValue = {
    cartItems,
    addToCart,
   updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    allProducts,
  };

  return( <ShopContext.Provider value={contextValue}>
       {props.children}
  </ShopContext.Provider>)
}
