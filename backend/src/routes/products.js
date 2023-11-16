import express from 'express'

import { verifyToken } from "./users.js";
import { ProductModel } from "../models/Products.js";

const router = express.Router()

//add prodcuts
router.post("/", async (req, res)=> {
    try {
        const {productName, price} = req.body
        const newProduct = new ProductModel({productName, price})
     
        await newProduct.save()
        res.json({newProduct})
    } catch (error) {
        console.error(error);
    }
})

router.get("/", async (req, res)=>{

    try {

        const products = await ProductModel.find({})
        res.json({products})

    } catch (error) {
        console.error(error);
    }
})

//get producnt count
router.get("/products-count",  async (req, res)=>{

    try {
        const numOfProducts = await ProductModel.count({})
        res.json({numOfProducts})
    } catch (error) {
        console.error(error)
    }   
})

export {router as productRouter}