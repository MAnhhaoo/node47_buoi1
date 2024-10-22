import dotenv from 'dotenv'
import jwt from "jsonwebtoken" // thu vien lib tao token 
// load file .env
dotenv.config();

const createToken = (data) =>{
  return  jwt.sign({ payload: data }, process.env.SECRET_KEY , {
        algorithm: "HS256",
        expiresIn: "30m" // m: minute, s: second, h: hour, d: day
    });
}

// define funtion để verify token 
const verifyToken = (token) => {
    try {
        jwt.verify(token ,process.env.SECRET_KEY);
        return true;
    }
    catch(error){
        return false;
    }
}

// define 1 middleware 
const middleweToken = (req, res, next) => {
    let {token} = req.headers;
    if(!token) {
        return res.status(401).json({massage: "Unauthorizied"})
    }
    let checkToken = verifyToken(token);
    if(checkToken){
        next() ; // pass check token 

    }
    else {
        return res.status(401).json({massage:"Unauthorrized"});
    }
}

export {
    createToken,middleweToken,
}