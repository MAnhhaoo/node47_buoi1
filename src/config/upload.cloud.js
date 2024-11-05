import express from "express";
import {v2 as cloudinary} from "cloudinary";
import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config();

// cấu hình cloudinary 
cloudinary.config({
    cloud_name: process.env.CLOUDNARY_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRET
    

})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'avatar',
        format: async (req,file)=>{
            // define nhũng format file cho phép up load lên cloud
            const validFormats = ['jpeg','png','gif','webp','jpg'];
            //lay dinh dang file
            const fileFormat = file.mimetype.split('/')[1];
            if(validFormats.includes(fileFormat)){
                return fileFormat;
            };
            return 'png';//return default định dạng của file ảnh 
        },
        public_id: (req, file)=>{
            const newName = new Date().getTime() + "_"+ file.originalname.split('.')[1];
            return newName;
        }
    }
});
// define middleware uploadCloud
export const uploadCloud = multer({storage});