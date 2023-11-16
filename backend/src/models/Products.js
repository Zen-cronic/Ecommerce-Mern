
import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({

    // id:{type:Number, required:true, },
    productName:  { type: String, required: true },
    price:  { type: Number, required: true },
    // productImage: product1,
})

export const ProductModel = mongoose.model("products", ProductSchema)