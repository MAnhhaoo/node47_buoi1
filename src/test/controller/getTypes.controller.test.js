
import {expect} from "chai";
import Sinon from "sinon";
import initModels from "../../models/init-models.js";
import sequelize from "../../models/connect.js";
import { getTypes, getVideos } from "../../controllers/videoController.js";
import { describe } from "mocha";
import { json } from "express";


const model = initModels(sequelize)
// define test case cho controller getTypes
describe("test case controller getTypes" , ()=>{
    let req , res , findAllStub ;
    beforeEach(()=>{
        req={}
        res = {
            status : Sinon.stub().returnsThis,
            json: Sinon.stub()
        }
        findAllStub = Sinon.stub(model.video_type, "findAll")
    })
// phuc hoi
    afterEach(()=>{
            findAllStub.restore();
    })
    // case 1: define get list type videos successfully
    it("Get list type video successfully" ,async ()=>{
      const mockData = [  {
            "type_id": 1,
            "type_name": "New",
            "icon": "fa-solid fa-house"
        },
        {
            "type_id": 2,
            "type_name": "Coding",
            "icon": "fa-solid fa-code"
        } ];
        findAllStub.resolves(mockData);
        await getTypes(req, res) ;


        // expect kqua mong muon
        expect(res.status.calledOnceWith(200)).to.but.true;
        expect(res.json.calledOnceWith(mockData)).to.be.true ;
    })
})
