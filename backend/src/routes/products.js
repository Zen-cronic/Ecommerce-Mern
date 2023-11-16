import express from "express";
import  ProductModel  from "../models/Products.js";
import { createProductHandler } from "../controllers/product.controller.js";

const router = express.Router();

//add prodcuts
router.route("/").post(createProductHandler).get()

  router.route('/products-count')
  .get( async (req, res) => {
    try {
      const numOfProducts = await ProductModel.count({});
      res.json({ numOfProducts });
    } catch (error) {
      console.error(error);
    }
  });
  

export { router as productRouter };
