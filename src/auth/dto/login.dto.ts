import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator"

export class loginDto {
@IsEmail({},{message: "email khong dung dinh dang"})
@ApiProperty()
email: string;


@IsNotEmpty({message: "mat khau khong dc de trong"})
@ApiProperty()
pass_word: string ;
}