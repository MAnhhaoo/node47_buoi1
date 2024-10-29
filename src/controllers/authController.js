import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { DATE, Op, where } from "sequelize"; // để dùng like trong những câu query
import bcrypt from "bcrypt"; // dung de ma hoa
import transporter from "../config/transporter.js";
import jwt from "jsonwebtoken"; // thu vien lib tao token
import { createRefToken, createToken } from "../config/jwt.js";
import crypto from "crypto"; // lib tao code forget password
import code from "../models/code.js";
const model = initModels(sequelize);

const signUp = async (req, res) => {
  try {
    // lấy input từ body request (email,full_name,pass_world)
    let { full_name, email, pass_word } = req.body;

    // kiểm tra email có tốn tại trong db hay k
    let checkUser = await model.users.findOne({
      where: {
        email,
      },
    });
    // code theo hướng fail first: bắt những case lỗi trc
    if (checkUser) {
      return res.status(400).json({ message: "email is wrong" });
    }
    // creat new user
    // creat => creat

    await model.users.create({
      full_name,
      email,
      pass_word: bcrypt.hashSync(pass_word, 10),
    });

    // send email
    // b1: cấu honhf email
    const mailOption = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "welcome to our services",
      html: `
            <h1>welcome ${full_name} to our service </h1>
            `,
    };
    console.log(mailOption);
    // b2 gửi email
    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        return res.status(500).json({ massage: "send mail fail" });
      }
      return res.status(201).json({ massage: "creat success" });
    });
  } catch (error) {
    return res.status(500).json({ massage: "err api" });
  }
};

const login = async (req, res) => {
  try {
    // lấy email và pass_ửod từ body res
    let { email, pass_word } = req.body;

    // kiểm tra email có tồn tại trong db hay k
    // nếu k có email thì return ra error
    let checkUser = await model.users.findOne({
      where: { email },
    });
    if (!checkUser) {
      return res.status(500).json({ message: "emmail is wrong" });
    }

    // neu ton tai => check pass
    //    param 1 pass ch ma hoa
    //    param 2 pass da ma hoa
    let checkPass = bcrypt.compareSync(pass_word, checkUser.pass_word);
    if (!checkPass) {
      return res.status(400).json({ message: "pass is wrong" });
    }
    // dùng lib jsonwebtoken để tạo token

    // tạo payload để lưu vào access token
    let payload = {
      userID: checkUser.user_id,
    };
    let accessToken = createToken(payload);
    let refreshToken = createRefToken(payload);
    await model.users.update({
      refresh_token: refreshToken
  }, { where: {user_id: checkUser.user_id}})

  // gắn refresh token cho cookie của response
    res.cookie('refreshToken' , refreshToken , {
      httpOnly: true ,
      secure: false, // dungf riêng cho localhost
      sameSite: 'Lax', // đảm bảo cookie đc gửi trong nhiều domain
      maxAge: 7 * 24 * 60 *60 * 1000 // thời gian tồn tại là 7 ngày
    })  
  return res
      .status(200)
      .json({ message: "login success", token: accessToken });
  } catch (error) {
    return res.status(500).json({ message: "error api login" });
  }
};

const loginFB = async (req, res) => {
  try {
    let { id, email, name } = req.body;
    // lấy info user từ db
    let checkUser = await model.users.findOne({
      where: {
        email,
      },
    });

    // nếu email này không tồn tại trong db => tạo user mới, send mail và
    // return access token
    if (!checkUser) {
      let newUser = await model.users.create({
        full_name: name,
        email,
        face_app_id: id,
      });
      // send email welcome
      // send email
      // B1: cấu hình email
      const mailOption = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Welcome to Our Service",
        html: `
                    <h1>Welcome ${name} to Our service</h1>
                `,
      };

      // B2: gửi email
      return transporter.sendMail(mailOption, (err, info) => {
        if (err) {
          return res.status(500).json({ massage: "Send email fail" });
        }
        // tạo access token
        // tạo payload để lưu vào access token
        let payload = {
          userId: checkUser.user_id,
        };

        // tạo access token bằng khóa đối xứng
        let accessToken = createToken(payload);

        // tạo refresh token
        return res
          .status(201)
          .json({ massage: "Login successfully", token: accessToken });
      });
    }

    // nếu user tồn tại
    // tạo access token
    // tạo payload để lưu vào access token
    let payload = {
      userId: checkUser.user_id,
    };

    // tạo access token bằng khóa đối xứng
    let accessToken = createToken(payload);
    return res
      .status(200)
      .json({ massage: "Login successfully", token: accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ massage: "error API login facebook" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    // b1 
    let { email } = req.body;
    console.log("get email", email);
    let checkUser = await model.users.findOne({
      where: { email },
    });
    if (!checkUser) {
      return res.status(400).json({ massage: "email is wrong" });
    }
    // tao code
    let randomCode = crypto.randomBytes(6).toString("hex");
    // tao bien de luu exprire code
    let exprired = new Date(new Date().getTime() + 2 * 60 * 60 * 1000); // exprired 2 tieng
    
    // luu code vao db
    await model.code.create({
      code: randomCode,
      exprired,
    });
    // send mail gui code forget pass word
    // send email
    // B1: cấu hình email
    const mailOption = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "code xac thuc",
      html: `
                    <h1> ${randomCode} </h1>
                `,
    };

    // B2: gửi email
    return transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        return res.status(500).json({ massage: "Send email fail" });
      }
      // tạo access token
      return res
        .status(200)
        .json({ massage: "send forget pass word successfully"});
    });
  } catch (error) {
    console.log("error ", error)
    return res.status(500).json({ massage: "error api forget pass" });
  }
};




  const changePassword = async (req , res ) =>{
    try {
      let {email , code , newPass} = req.body;
      
      
      // check mail co ton tai trong db hay khong
      let checkEmail = await model.users.findOne({
        where: {email}
      });
      if(!checkEmail) {
        return res.status(400).json({massage: "email is wrong"});
      }
      if (!code) {
        return res.status(400).json({massage: "code is wrong"})
      }
      let checkCode = await model.code.findOne({
        where: {code}
      })
      if(!checkCode) {
        return res.status(400).json({massage: "code is wrong"})
      }

      let hasNewPass = bcrypt.hashSync(newPass , 10);
      // c1 
      checkEmail.pass_word = hasNewPass;
      checkEmail.save();
      // c2 dung function update

      // huy code sau khi da change password
      await model.code.destroy ({
        where: {code}
      })
      return res.status(200).json({massage: "change password successfully"});


    } catch (error) {
      return res.status(500).json({massage: "error api change password"});

    }
  }

  const extendToken = async (req ,res ) => {
    try {   
      // lấy rếhToken từ cookies của req
      let refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({massage: "401"});
      }
      // check refresh token trong db
      let userRefToken = await model.users.findOne({
        where : {
          refresh_token: refreshToken
        }
      });
      if(!userRefToken || userRefToken == null) {
        return res.status(401).json({massage: "401"}) ;
      }

      // creat new access token
      let newAccessToken = createToken({userId: userRefToken.user_id})
      return res.status(200).json({massage: "success" , token: newAccessToken})
    } catch (error) {
      return res.status(500).json({massage : "err apo extend token"})
    }
  }

export { signUp, login, loginFB, forgotPassword , changePassword  , extendToken};
