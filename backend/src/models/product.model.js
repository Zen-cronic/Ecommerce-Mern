
import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({

    productName:  { type: String, required: true },
    price:  { type: Number, required: true },
})

const ProductModel = mongoose.model("products", ProductSchema)
export default ProductModel;