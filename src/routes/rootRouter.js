import express from "express";
import userRouter from "./userRouter.js";
import { getUsers , getUsersOrm } from "../controllers/userController.js";
import videoRouter from "./videoRouter.js";
import athRouter from "./authRouter.js";


// define object rootRouter
const rootRouter = express.Router();

// import userRouter vaof rootRouter

rootRouter.use("/user", userRouter);
// sau buoc rootRouter.use("/user", userRouter); thì đem rootRouter qua file index.js app.use(rootRouter)


userRouter.get("/get-users-orm" , getUsersOrm)


// import video vaof root
rootRouter.use("/video" , videoRouter);


// import auth vao rootRouter
rootRouter.use("/auth" , athRouter);

export default rootRouter;