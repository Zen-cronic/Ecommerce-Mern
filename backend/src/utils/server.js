import express from "express";
import cors from "cors";

import { userRouter } from "../routes/auth.route.js";
import { productRouter } from "../routes/products.route.js";
import { checkoutRouter } from "../routes/checkout.route.js";
import { historyRouter } from "../routes/history.route.js";
import { searchRouter } from "../routes/search.route.js";
import errorHandler from "../middleware/errorHandler.js";

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use("/auth", userRouter);
  app.use("/checkout", checkoutRouter);
  app.use("/products", productRouter);
  app.use("/history", historyRouter);
  app.use("/search", searchRouter);

  // app.use(errorHandler);

  return app;
}

export default createServer;
