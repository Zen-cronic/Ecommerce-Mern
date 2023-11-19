import asyncHandler from "express-async-handler";
import { createProduct, getAllProducts, getOneProduct } from "../services/product.service.js";

 const createProductHandler = asyncHandler(async (req, res) => {

  const newProduct = await createProduct(req.body);

 
  return res.status(201).json({ newProduct });
});

 const getAllProductsHandler = asyncHandler(async (req, res) => {

  const allProducts = await getAllProducts();
  // console.log(allProducts);
  return res.status(200).json({ allProducts });
});

const getOneProductHandler = asyncHandler(async(req,res)=> {

  const {productId} = req.params
 
    const product = await getOneProduct(productId)
    
    // if(!product){
    //   return res.sendStatus(404)
    // }


    return res.status(200).json({product})
  

  //if not found - 404
 
})


export {getAllProductsHandler, createProductHandler, getOneProductHandler}

