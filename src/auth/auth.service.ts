import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { loginDto } from './dto/login.dto';
import { PrismaClient } from '@prisma/client';
import { use } from 'passport';
import { error } from 'console';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { promises } from 'dns';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {

  prisma = new PrismaClient();

  constructor(
    private readonly jwtService: JwtService,// dùng để tạo token
    private readonly configService: ConfigService,
    private readonly emailService: EmailService

  ){}

  async login(body: loginDto) :Promise<string> {
    try {
      const {email, pass_word} = body;
      // check get user bang email
      const user = await this.prisma.users.findFirst({
        where: {email}
      })
      // kiểm tra user có tồn tại hay không
      if(!user){
        throw new BadRequestException("email is wrong");
      }
      const checkPass = bcrypt.compareSync(pass_word,user.pass_word);

      // kiểm tra password có trùng không
      
      // cheat password 
      // const hashPassword = bcrypt.hashSync(pass_word,10);
      // console.log(hashPassword)

      if(!checkPass){
        throw new BadRequestException("pass word is wrong")
      }

      // tạo token
      const token = this.jwtService.sign(
        {data: {
          userId: user.user_id // define payload muốn lưu vào token
        }},
        {
          expiresIn : this.configService.get('JWT_EXPIRES_IN'), // thời gian sống của token
          secret: this.configService.get("SECRET_KEY"), // secret key để tạo token
        }
      ) 
      return "token"

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async signup (body:CreateUserDto) : Promise <any>{

    try {
     let {full_name , email , pass_word , role_id} = body;

     // get user by email

     let user = await this.prisma.users.findFirst({
      where: {email}
     }) ;
     // check user exists
     if(user){
      // ra loi 400
      throw new BadRequestException("email is exists")
     }

     // hash password

     pass_word = bcrypt.hashSync(pass_word, 10);


     // create user
     const newUser = await this.prisma.users.create({
      data: {
        full_name,
        email,
        pass_word,
        role_id
      }
     })

// send mail welcome 
     await this.emailService.sendEmail(email, 'welcome to node47','welcome to node47')

    } catch (error) {
      console.log(error)
      throw new Error (error.message)
      
    }

  }

 
}
