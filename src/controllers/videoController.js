import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import {Op, where} from "sequelize"; // để dùng like trong những câu query 

const model = initModels(sequelize);

const getVideos = async (req,res) => {
try {
    let page = 3 ;
    let size = 4 ;
     let index = (page - 1) * size ;
    let data = await model.video.findAll({
        offset : index ,
        limit : size , 
    });
    // vd page = 2 limit = 4
    // bỏ qua 4 item đầu tiên và lấy 4 item tiếp theo
    return res.status(200).json(data)
}
catch (error){
    console.log(error)
    return res.status(500).json({massage: "error for api get list videos"})
}

 }

 const getTypes = async (req ,res ) =>{
    try {
        let data = await model.video_type.findAll();
        return res.status(200).json(data)
    }
    catch(error){
        console.log(error);
        return res.status(500).json({massage: "error for api get type videos"})
    }
 }

 const getListVideoTypes = async (req, res) =>{
    try {
        let {typeID} = req.params;
        console.log(typeID)
        let data = await model.video.findAll({
            where : {
                type_id: typeID
            }
        })
        return res.status(200).json(data);
    }
    catch (error){
            return res.status(500).json({massage: "error for api get list video by type id"})
    }
 }

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