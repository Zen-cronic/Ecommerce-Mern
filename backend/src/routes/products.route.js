import express from "express";

import {
  createProductHandler,
  getAllProductsHandler,
  getOneProductHandler,
  getProductsCountHandler,
} from "../controllers/product.controller.js";

const router = express.Router();

router.route("/").post(createProductHandler).get(getAllProductsHandler);

router.route("/:productId").get(getOneProductHandler);

router.route("/products-count").get(getProductsCountHandler);

export { router as productRouter };
