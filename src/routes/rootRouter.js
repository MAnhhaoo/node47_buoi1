import express from "express";
import userRouter from "./userRouter.js";
import { getUsers , getUsersOrm } from "../controllers/userController.js";


// define object rootRouter
const rootRouter = express.Router();

// import userRouter vaof rootRouter

rootRouter.use("/user", userRouter);

userRouter.get("/get-users-orm" , getUsersOrm)


export default rootRouter;