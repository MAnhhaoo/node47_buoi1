import express from "express";
import { getVideos ,getTypes,getListVideoTypes ,getVideoDetail } from "../controllers/videoController.js";
import { middleweToken } from "../config/jwt.js";
import { tryCatch } from "../config/tryCatch.js";

const videoRouter = express.Router();



// deefine API get list videos 

/**
* @swagger
* /video/get-videos:
*   get:
*       description: responses
*       tags: [User]
*       parameters:
*       - in: path
*         name: id
*       - in: body
*         name: user
*         schema:
*             type: object
*             properties:
*                   video_name:
*                       type: string
*                   thumbnail:
*                       type: string
*                   duration:
*                       type: number
*       responses:
*             200:
*                description: res
*/
videoRouter.get("/get-videos" , tryCatch(getVideos))


/**
* @swagger
* /video/get-types:
*  post:
*       description: responses
*       tags: [Video]
*       responses:
*           200:
*               description: success
*/



videoRouter.get("/get-types",getTypes)
// define API get type videos


videoRouter.get("/get-list-video-type/:typeID" , tryCatch(getListVideoTypes))

// define apt get video detail

videoRouter.get("/get-video-detail/:videoId",getVideoDetail )


export default videoRouter;