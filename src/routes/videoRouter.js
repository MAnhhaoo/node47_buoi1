import express from "express";
import { getVideos ,getTypes,getListVideoTypes ,getVideoDetail } from "../controllers/videoController.js";
import { middleweToken } from "../config/jwt.js";
import { tryCatch } from "../config/tryCatch.js";

const videoRouter = express.Router();



// deefine API get list videos 

videoRouter.get("/get-videos" , tryCatch(getVideos))


videoRouter.get("/get-types",getTypes)
// define API get type videos


videoRouter.get("/get-list-video-type/:typeID" , tryCatch(getListVideoTypes))

// define apt get video detail

videoRouter.get("/get-video-detail/:videoId",getVideoDetail )


export default videoRouter;