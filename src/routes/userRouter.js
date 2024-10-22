import express from "express";
import { getUsers,getUserOrmById ,createUserOrm ,createUser } from "../controllers/userController.js";
import { middleweToken } from "../config/jwt.js";


// lây logic của router đem qua controller để dùng 
// define obiject userRouter
const userRouter = express.Router();

//define API get userRouter
userRouter.get("/get_users", getUsers);

userRouter.post("/create-user",createUser)

userRouter.get("/get-user-db",getUsers );
userRouter.get("/get-users-orm/:id",getUserOrmById);
userRouter.post("/create-user-orm",middleweToken, createUserOrm);




export default userRouter