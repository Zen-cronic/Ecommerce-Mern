import expressAsyncHandler from "express-async-handler";
import { checkOut } from "../services/checkout.service.js";
import { findUserById } from "../services/user.service.js";


const checkOutHandler =  async (req, res) => {

    
    const id = req.params.userID;

    const user = await findUserById(id)

    if (!user) {
      return res.status(401).json({ message: "Must be logged in to checkout" });
    }
  
    const currentOrder = await checkOut(req.body, user)

    return res.json({ currentOrder })

}

export {checkOutHandler}