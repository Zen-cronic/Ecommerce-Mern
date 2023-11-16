import React, { useContext } from 'react';
import { ShopContext } from "../../context/shop-context";


export const Product = (props)=> {

  const { productName, price} = props.data //data is the property
  const {addToCart, cartItems} = useContext(ShopContext)
  const id = props.data._id
  const cartItemCount = cartItems[id]   //the valu of the property name



return (
  <div className="product">
    {/* <img src={productImage} /> */}
    <div className="description">
      <p>
        <b>{productName}</b>
      </p>
      <p> ${price}</p>
    </div>
    <button className="addToCartBttn" onClick={() => addToCart(id)}>
      Add To Cart {cartItemCount > 0 && <> ({cartItemCount}) </>}
    </button>
  </div>
);
}

//mi error: no spc btn <> and ({cartItemCount})




