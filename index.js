import express from "express";
import {buildSchema} from "graphql";
import {graphqlHTTP} from "express-graphql"
const app = express() ;

// khởi tạo đối tượng schema
// quy tắc viết schema:
// phải có query hoặc là Mutation trong schema
// nếu query hoặc mutation k có function thì phải xóa đi
const schema = buildSchema(`
    type Video {
    id: String
    name: String
    }
    type Query {
    getVideo(id: String , name: String) : String
    getListVideo: [String]
     }
    `);

const resolver = {
    getVideo: ({id , name})=>{
        return {id,name};
    },
    getListVideo: ()=>{
        return ["videoA","videoB"];
    }
}

// tạo URL để hiển thị graphQL UI
app.use("/graph", graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
}))



app.listen("8080", ()=>{
    console.log("BE is starting with port 8080")
})