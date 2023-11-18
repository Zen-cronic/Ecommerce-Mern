import express from "express";

import {
  createProductHandler,
  getAllProductsHandler,
  getOneProductHandler,
} from "../controllers/product.controller.js";

const router = express.Router();

router.route("/").post(createProductHandler).get(getAllProductsHandler);

router.route("/:productId").get(getOneProductHandler);

export { router as productRouter };
