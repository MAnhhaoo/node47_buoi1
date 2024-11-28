import {diskStorage} from 'multer' ;
import { extname } from 'path';// lib để lấy đuôi file

// define functional
export const storage = (destination: string): any =>{
    return diskStorage({
        destination: `./public/imgs/${destination}`,
        filename: (req ,file ,callback) =>{
            const uniqueName = Date.now();

            // extrname (hinh1.png) => ".png"
            callback(null, `${uniqueName}${extname(file.originalname)}`);
        }
    })
}