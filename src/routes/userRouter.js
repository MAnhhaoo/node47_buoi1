import express from "express";
import { getUsers,getUserOrmById ,createUserOrm ,createUser ,updateUser ,deleteUser } from "../controllers/userController.js";
import { middleweToken } from "../config/jwt.js";
import { tryCatch } from "../config/tryCatch.js";
import { upload } from "../config/upload.js";
import { uploadCloud } from "../config/upload.cloud.js";


// lây logic của router đem qua controller để dùng 
// define obiject userRouter
const userRouter = express.Router();

//define API get userRouter
userRouter.get("/get_users", getUsers);
userRouter.post("/create-user",createUser)
userRouter.get("/get-user-db",getUsers );
userRouter.get("/get-users-orm/:id",getUserOrmById);
userRouter.post("/create-user-orm", createUserOrm);
userRouter.put("/update-user" , tryCatch(updateUser) );
userRouter.delete("/delete-user/:user_id" , deleteUser )
userRouter.post("/upload-avatar",upload.single("hinhAnh"),(req,res)=>{
    let file = req.file;
    return res.status(200).json(file);

}) ;

userRouter.post("/upload-nultiple-avatar" , upload.array("hinhAnhs", (req,res)=>{
    let files = req.file;
    return res.status(200).json(files)
}))

userRouter.post("/upload-cloud-avatar", uploadCloud.single("hinhAnh"), async (req,res)=>{
    let file = req.file;
    return res.status(200).json(file);
})

userRouter.post("/upload-multiple-cloud", uploadCloud.array("hinhAnhs"),(req, res)=>{
    let files = req.files;
    return res.status(200).json(files)
})

export default userRouter