import { json } from "express";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import {Op, where} from "sequelize"; // để dùng like trong những câu query 
import connect from "../../db.js";
import { PrismaClient } from "@prisma/client";

// tạo object model đại diện cho tất car model của ORM
const model = initModels(sequelize);

const prisma = new PrismaClient

const getUsers = async (req,res)=>{
    const [data] =await connect.query(`
        SELECT * from orders
        `)
        res.send(data);
};
 
const createUser = (req,res)=>{

    let body = req.body;
    res.send(body);
}

const getUsersOrm = async (req ,res ) => {
    try {
        // select * from users
        // where full_name like '%John%'
        let data = await model.users.findAll({
            where : {
                full_name : {
                    [Op.like] : `%John%`
                }
            },
            attributes: ["user_id" , "full_name" , "email" ],
            include: [
                {
                    model: model.video, // join voiws table video 
                    as: 'videos',
                    attributes: ["video_name"],
                    required: true // set join table theo kiểu inner join còn nếu k có thì mặc định lèt join    
                }
            ]
        });
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({massage: "error from ORM"})
    }
}
const getUserOrmById = async (req , res ) => {
    try { 
        let {id} = req.params; // cách lấy thông tin của id 
        let data = await model.users.findOne({
            where : {
                user_id : id
            }
        }) 
        return res.status(200).json(data)
    } catch {
        return res.status(500).json({massage: "error form ORM"})
    }
}
const createUserOrm = async (req,res)=> {
    try{
        let{full_name ,email} = req.body; /// tạo user thì lấy body
        //  await model.users.create({
        //     full_name ,
        //     email
        //  })
        await prisma.users.create({
            data: {
                full_name,email
            }
        })
         return res.status(201).json({message: "create user successfully"})
    } catch {
        return res.status(500).json({massage: "error from ORM"})
    }
}
const updateUser = async (req,res)=>{
    let {full_name , avatar , pass_word} = req.body;
    let checkUser = await prisma.users.findFirst({
        where: {email}
    })
    if(!checkUser) {
        return res.status(400).json({message: "email is wrong"})
    }
     await prisma.users.update(
        {data: {
            full_name,
            avatar,
            pass_word
        } ,
        where: {
            email
        }},
    )
    return res.status(200).json({message: "update user successsfully"})
}
const deleteUser = async (req , res) => {
    let {user_id} = req.params;
    let checkUser = await prisma.users.findFirst({
        where : {user_id : Number(user_id)}
    })
    if(!checkUser){
        return res.status(400).json({message: "user not found"}) ;
    }
    await prisma.users.delete({
        where: { user_id : Number(user_id)}
    })
    // on delete casecade table có chứa khóa ngoại
    //  video_like
    // user_id INT ,
    // foregin key (user_id) reference users(user_id) on delete cascade 
    return res.status(200).json({message: "delete user successfully"})
}
export {
    getUsers,
    createUser,
    getUsersOrm,
    getUserOrmById,
    createUserOrm,
    updateUser,
    deleteUser
}

