import express from "express";
import { checkOutHandler } from "../controllers/checkout.controller.js";

const router = express.Router();

router.put("/:userID", checkOutHandler);

export { router as checkoutRouter };
