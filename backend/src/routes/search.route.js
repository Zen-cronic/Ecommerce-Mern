import express from "express";
import { searchProductsHandler } from "../controllers/search.controller.js";
const router = express.Router();

//api endpint is just /search, but the frontend url will have params with query
// router.post("/?q=:query", async(req, res)=> {
router.post("/", searchProductsHandler)

export { router as searchRouter };
