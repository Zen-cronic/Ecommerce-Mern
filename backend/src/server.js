
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/users.js";
import { productRouter } from "./routes/products.js";
import { checkoutRouter } from "./routes/checkout.js";
import { historyRouter } from "./routes/history.js";
import { searchRouter } from "./routes/search.js";
import errorHandler from "./middleware/errorHandler.js";



const app = express()

app.use(express.json())
app.use(cors())


app.use("/checkout", checkoutRouter)
app.use("/users", userRouter)
app.use("/products", productRouter)
app.use("/history", historyRouter)
app.use("/search", searchRouter)

app.use(errorHandler)

mongoose.connect("mongodb+srv://kzh113:pass123@recipes.vivbonf.mongodb.net/eCommerce?retryWrites=true&w=majority").then(
    ()=> {
app.listen(5005, console.log("Server started on 5005 wiht type set to module"))})