import {expect} from "chai";
import Sinon from "sinon";
import initModels from "../../models/init-models.js";
import sequelize from "../../models/connect.js";
import { getTypes, getVideos } from "../../controllers/videoController.js";
import { describe } from "mocha";
import { json } from "express";


const model = initModels(sequelize)

// define bo test case cho finction getVideo
// test case 1: get video success
// test case 2 get video fail (connect database fail)
describe('getVideos', ()=>{ // define bộ test case 

    // giả lập req , res , findAll
    let req , res ,findAllStub ;


    // thiết lặp môi trg cho testing
    beforeEach (()=>{
        req = {} ;
       // res.status().json() => sinon để giả lặp res
        res = {
            status: Sinon.stub().returnsThis() ,
            json : Sinon.stub()
        }; 
        // giả lập finction findAll của ORM => sinon
        findAllStub = Sinon.stub(model.video, 'findAll');

    });

    afterEach (()=> {
        // khôi phục lại findAllStub
        findAllStub.restore()
    });

    // dèine tưng case cụ thể
    // case 1 getVideos success
    it ("getVideo successfully" , async ()=>{
        // chuẩn bị list video
        const mockVideos =[
            {
                "video_id": 1,
                "video_name": "Introduction to Coding",
                "thumbnail": "deadpool.jpg",
                "description": "Learn the basics of coding",
                "views": 1500,
                "source": "youtube.com",
                "user_id": 1,
                "type_id": 2
            },
            {
                "video_id": 6,
                "video_name": "Full Stack Web Development Tutorial",
                "thumbnail": "http://res.cloudinary.com/dghvdbogx/image/upload/v1722343917/node43/qos3uy7t4tbdp5vknys0.jpg",
                "description": "Complete guide to full stack web development",
                "views": 1200,
                "source": "youtube.com",
                "user_id": 1,
                "type_id": 2
            }
        ] ;
        // gán list videos giả lặp vào finAllStub
        // do ket qua findAll là promise => stub dùng resolves
        findAllStub.resolves(mockVideos )

        // call function getvideos để ra happy case (list video)
        await getVideos (req, res) ;
        // mong đợi status code là 200
        expect(res.status.calledOnceWith(200)).to.be.true ;
    })

    // case 2 getvideo fail
    it("getVideo fail , " , async ()=>{
        // giả lặp kết nối tới database thất bại
        findAllStub.rejects(new Error ('Database error'));

        // call function getVideos 
        await getVideos(req ,res) ;

        // expect ket qua
        expect (res.status.calledOnceWith(500)).to.be.true;
        // expect(res.json.calledOnceWith({massage: "error for api get type videos"})).to.be.false;
    })
})
