import React, {useState, useEffect, useContext} from 'react';
import "./shop.css";

import { Product } from "./product";
import { ShopContext } from '../../context/shop-context';



export const Shop = ()=> {

  const {allProducts} = useContext(ShopContext);
  

  return (

    <div className="shop">
    <div className="shopTitle">
      <h1>Mi Shop</h1>
    </div>

    <div className="products">
    
      
        {allProducts? allProducts.map( product => (

            <Product data={product} key={product._id}/>
        )):
        
        <p>0 products to display</p>}
        
    </div>
    </div>

      );
}
