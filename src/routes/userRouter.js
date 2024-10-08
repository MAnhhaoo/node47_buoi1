import express from "express";
import { getUsers,getUserOrmById ,createUserOrm } from "../controllers/userController.js";


const userRouter = express.Router();

//define API get userRouter
userRouter.get("/get_users", getUsers);

userRouter.post("/create-user", (req,res)=>{

    let body = req.body;
    res.send(body);
})

userRouter.get("/get-user-db",getUsers );
userRouter.get("/get-users-orm/:id",getUserOrmById);
userRouter.post("/create-user-orm",createUserOrm);



export default userRouter