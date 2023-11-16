
import express from "express"
import  UserModel  from "../models/Users.js";
import  ProductModel from "../models/Products.js";

const router = express.Router()


//get all history
router.get("/:userID", async(req, res)=>{
    
    
    const id = req.params.userID
    const user = await UserModel.findById(id)
    if(!user){
        res.status(400).json({message: "sth went wrong with userID"})
    }

    const allOrders = user.orders    //only the ids and counts

    res.json({allOrders})
})



export {router as historyRouter}