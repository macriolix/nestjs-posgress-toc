import { Transform } from "class-transformer"
import { IsEmail, IsString, MinLength, isEmail } from "class-validator"

export class logindto{
     @IsEmail()
    email: string
    @Transform(({value})=> value.trim())
    @IsString()
    @MinLength(6)
    password: string

}