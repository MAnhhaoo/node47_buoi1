import express from 'express'
import connect from './db.js';
import rootRouter from './src/routes/rootRouter.js';


// tạo object tổng của express
const app = express ();

// thêm middleware để convert string về json với API POST và PUT

app.use(express.json());

// improt rootRouter toi index.js
app.use(rootRouter)


// viết API hello world 
app.get("/hello-world" , (req,res)=>{
    res.send("hello word");
});

app.get("/xin-chao", (req,res)=>{
    res.send("xin chao");
});

// lấy thông tin data tưd params , query string , headers , body 
// http://localhost:8080/get-user/1
// define API get-user
app.get("/get-user/:id/:hoTen", (req,res)=>{

    // layas id từ URL
    let {id,hoTen} = req.params;
    // ?queryString=Haoo
    let {queryString} = req.query;
    let {token ,authorization} = req.headers;
    res.send({id , hoTen , queryString ,token ,authorization});

});

// lấy body từ API POST (create) và PUT (update)
'{"id": 1 , "ho ten ":"hao"}'
app.post("/create-user", (req,res)=>{

    let body = req.body;
    res.send(body);
})

app.get("/get-user-db", async (req,res)=>{
    const [data] =await connect.query(`
        SELECT * from orders
        `)
        res.send(data);
})


app.post("/create-user-db", async (req, res) => {
    const query = `
        INSERT INTO users(full_name, email, pass_word) VALUES
        (?, ?, ?)
    `;
    let body = req.body;
    let {full_name, email, pass_word} = body;
    const [data] = await connect.execute(query, [full_name, email, pass_word])
    return res.send(data);
})
// define port cho BE
app.listen(8080, ()=>{
    console.log("BE Strating with prot 8080");
})
