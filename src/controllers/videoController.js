import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op, where } from "sequelize"; // để dùng like trong những câu query 
import { PrismaClient } from "@prisma/client";
const model = initModels(sequelize);

const prisma = new PrismaClient();

const getVideos = async (req,res) => {
 
    let page = 3 ;
    let size = 4 ;
     let index = (page - 1) * size ;
    // let data = await model.video.findAll({
    //     offset : index ,
    //     limit : size , 
    // });
    // vd page = 2 limit = 4
    // bỏ qua 4 item đầu tiên và lấy 4 item tiếp theo
    let data = await prisma.video.findMany({
        skip: index ,
        take : size 
    });
    return res.status(201).json(data)



 }

 const getTypes = async (req ,res ) =>{
     let data = await prisma.video_type.findMany({
        where: {
            type_id: 1
        }, 
        select: {
            type_name : true
        }
     });
        return res.status(200).json(data)
    
 }

 const getListVideoTypes = async (req, res) =>{
        // let {typeID} = req.params;
        // console.log(typeID)
        // let data = await model.video.findAll({
        //     where : {
        //         type_id: typeID
        //     }
        // })
            // Lấy `videoId` từ `req.params`
            let { videoId } = req.params;
    
            // Tìm video với `videoId` và bao gồm thông tin người dùng liên quan
            let data = await prisma.video.findFirst({
                where: {
                    video_id: Number(videoId)
                },
                include: {
                    users: {
                        select: {
                            user_id: true,
                            full_name: true,
                            email: true
                        }
                    }
                }
            });
            return res.status(200).json(data)
            
        };
    
 const getVideoDetail = async (req ,res) =>{
    try{
        let {videoId} = req.params;
        let data = await model.video.findOne({
            where: {
                video_id : videoId,
            },
            include: [ {

                model: model.users,
                as: "user",

            }
              
            ]
        })
        return res.status(200).json(data) ;
    }
    catch(error){
        return res.status(500).json({massage:"err for api get video detail"})
    }
 }
 export {
    getVideos,
    getTypes,
    getListVideoTypes,
    getVideoDetail,
 }