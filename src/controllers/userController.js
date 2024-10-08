import { json } from "express";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import {Op} from "sequelize";

// tạo object model đại diện cho tất car model của ORM
const model = initModels(sequelize);


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
                    required: true // sex join table theo kiểu inner join còn nếu k có thì mặc định lèt join    
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
        let {id} = req.params;
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
        let{full_name ,email} = req.body;
         await model.users.create({
            full_name ,
            email
         })
         return res.status(201).json({message: "create user successfully"})
    } catch {
        return res.status(500).json({massage: "error from ORM"})
    }
}
export {
    getUsers,
    createUser,
    getUsersOrm,
    getUserOrmById,
    createUserOrm
}

