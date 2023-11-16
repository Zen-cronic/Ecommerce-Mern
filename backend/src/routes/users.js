
import express from "express"
import  UserModel  from "../models/Users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// require('dotenv').config()
import dotenv from 'dotenv' 
dotenv.config()

const router = express.Router()




router.post("/register", async (req, res)=>{

    const {username, password} = req.body


    const user = await UserModel.findOne({username})

    if(user){

        res.status(400).json({message: "Username alr exists"})
    }

    const hashedPw = await bcrypt.hash(password, 10)
    const newUser = new UserModel({username, password: hashedPw})

    await newUser.save()

    res.json({message: `${newUser.username} is registed susscsful`})
})


//middleware -veriftyToekn
router.post("/login", async(req, res)=> {

    const {username, password} = req.body

    const user = await UserModel.findOne({username})
    if(!user){

        res.status(400).json({message: "Wrong username or password"})

    }
    const isPwValid = await bcrypt.compare(password, user.password)
    if(!isPwValid){

        res.status(400).json({message: "Wrong passwrod"})
    }

    const token = jwt.sign({id: user._id}, "secret")

    res.json({token, userID: user._id})


})

export {router as userRouter}

export const verifyToken= async(req,res,next)=>{

    const authHeader = req.header.authentication

    //3rd callback verifty struct
    if(authHeader){

        jwt.verify(authHeader, "secret", (err)=> {

            if(err){

                return res.sendStatus(403)
            }
            next()
        })
    } 

    else{

        res.sendStatus(401);
    }

    
  
}