import { getOrderHistory } from "../services/history.service.js";
import { findUserById } from "../services/user.service.js";


const historyHandler = async(req,res) => {

        const id = req.params.userID;

        const user = await findUserById(id)

        if (!user) {
          return res.status(401).json({ message: "Must be logged in to see order history" });
        }


        const allOrders = await getOrderHistory(user)
      
        return res.json({ allOrders });
}

export {historyHandler}