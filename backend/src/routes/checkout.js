

import express from "express"
import { UserModel } from "../models/Users.js";

const router = express.Router()

//v2
router.put("/:userID", async(req, res)=>{

    //const {productsArr} = req.body
    const {productsArr, totalAmount} = req.body
    const id = req.params.userID
  const user = await UserModel.findById(id)
    if(!user){
        res.status(400).json({message: "sth went wrong with userID"})
    }

//currentOrder from [] to {}
    let currentOrder = {}
    let currentItems = []
    
//is this rly necesary?  apparently y
    // productsArr.map(p=> {

     

    //     //p.orderItems 
    //     const [productID, count] = Object.entries(p.orderItems)[0]

    //     currentOrder.push({productID, count})
      
    // })

    
    // user.orders.push(currentOrder)
   
//chges due to mdl chges with Date  v0


    // productsArr.map(p=> {

    //     p.orderItems.map(innerP=> {

    //         const [productID, count] = Object.entries(innerP)[0]
    //     // currentOrder.push(
    //     //     {productID, count}})
    //     // })
    //         currentItems.push({productID, count})
    //     })    
        
    //     currentOrder.push({orderItems: currentItems})
    // })
    
    // user.orders.push(currentOrder)

//v1

    productsArr.map(p=> {
    //p.orderItems 
        const [productID, count] = Object.entries(p)[0]
        currentItems.push({productID, count})  //an arr of obj with count and id props

        
})

            //or orderDate: new Date.now()
    currentOrder = {orderDate: new Date(), orderItems: currentItems, orderTotal: totalAmount}

    user.orders.push(currentOrder)

    await user.save()

    // res.json({purchased: user.purchased, purchasedCount:user.purchasedCount})
    // res.json({productsArr: currentOrder})
    res.json({currentOrder})

})




export {router as checkoutRouter}