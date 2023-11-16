import asyncHandler from "express-async-handler";
import { createProduct } from "../services/product.service.js";



export const createProductHandler = asyncHandler(async(req, res) => {


    const newProduct = await createProduct(req.body)
    
    return res.status(201).json({newProduct})
        
})

export const getAllProducts = asyncHandler(async (req, res) => {
    try {
      const products = await ProductModel.find({});
      res.json({ products });
    } catch (error) {
      console.error(error);
    }
  })