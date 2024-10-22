import express from "express";
import { getVideos ,getTypes,getListVideoTypes ,getVideoDetail } from "../controllers/videoController.js";
import { middleweToken } from "../config/jwt.js";

const videoRouter = express.Router();



// deefine API get list videos 

videoRouter.get("/get-videos" , getVideos)


videoRouter.get("/get-types",middleweToken,getTypes)
// define API get type videos


videoRouter.get("/get-list-video-type/:typeID" , getListVideoTypes)

// define apt get video detail

videoRouter.get("/get-video-detail/:videoId",getVideoDetail )


export default videoRouter;