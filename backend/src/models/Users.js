
import mongoose from "mongoose";
// import { ProductModel } from "./Products";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },

  
   //remove additionla outer arr - from [[ to [
    orders: [
      
      {
        //either now() or now works, unlike in checkout-route where only now() workds
        orderDate: {type: Date, default: Date.now()},
        orderItems:
      [{

   
      productID: {type:mongoose.Schema.Types.ObjectId, ref:"products"},
      count: {type: Number},

    }],
  
      orderTotal: {type: Number}
      },
      
  ]

  
  });

const UserModel = mongoose.model("users", UserSchema)

export default UserModel;

