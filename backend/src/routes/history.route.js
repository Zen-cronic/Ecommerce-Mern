import express from "express";
import UserModel from "../models/user.model.js";
import { historyHandler } from "../controllers/history.controller.js";

const router = express.Router();

//get all history
router.get("/:userID", historyHandler);

export { router as historyRouter };
