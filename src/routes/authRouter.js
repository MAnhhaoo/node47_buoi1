import express from "express";
import { signUp ,login ,loginFB, forgotPassword ,changePassword } from "../controllers/authController.js";



const athRouter = express.Router();

// define API sign-up

athRouter.post("/sign-up" , signUp);

// define api login
athRouter.post("/login" , login)

//define api login fb
athRouter.post("/login-fb", loginFB)

// b1 define api forgot pass word 
athRouter.post("/forgot-password" , forgotPassword);

athRouter.post("/change-password" , changePassword)
export default athRouter;

