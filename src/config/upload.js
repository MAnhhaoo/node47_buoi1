import multer , {diskStorage} from "multer";

// define nơi lưu hình trong source BE
// => /public/imgs
//  process.cwd() tim đường dẫn tuyệt đối tới source code BE
export const upload = multer({
    // đây là nơi lưu trữ 
    storage: diskStorage({
        destination: process.cwd() + "/public/imgs",
        filename: (req , file, callback) => {
            let newName = new Date().getTime()+ "_" + file.originalname;
            callback(null , newName) ;
        }
    })
})