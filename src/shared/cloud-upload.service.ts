import {Inject, Injectable} from "@nestjs/common"
import { UploadApiResponse } from "cloudinary";

@Injectable() // dependence injection de nhung vao module



export class CloudinaryUploadService{

    constructor(@Inject('CLOUDINARY')private cloudinary){}
    async uploadImage(file: Express.Multer.File, destination: string ): Promise<UploadApiResponse> {
        return new Promise((resolve , reject) => {
            const uploadStream = this.cloudinary.uploader.upload_stream(
                {folder : destination}, // define folder tren cloudinary neu folder k co tren cloudinary thi se tao folder moi
                (error :any , result: UploadApiResponse)=>{ // upload hinh len cloudinary
                    if(error) {
                        reject(error)
                    } else {
                        resolve(result)
                    }
                }
            );
            uploadStream.end(file.buffer); // sau khi cònfig xong thì gửi file lên network
        })
    } 
}