import express from "express";
import { loginUserHandler, registerUserHandler } from "../controllers/auth.controller.js";

const router = express.Router();


router.post("/register", registerUserHandler )

router.post("/login", loginUserHandler)
export { router as userRouter };

// export const verifyToken = async (req, res, next) => {
//   const authHeader = req.header.authentication;

//   //3rd callback verifty struct
//   if (authHeader) {
//     jwt.verify(authHeader, "secret", (err) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };
