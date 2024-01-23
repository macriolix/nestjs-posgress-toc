import { Transform } from "class-transformer"
import { IsEmail, IsString, MinLength, isString } from "class-validator"

export class Registerdto{
    @IsString()
    @MinLength(1)
    name: string
    @IsEmail()
    email: string
    @Transform(({value})=> value.trim())
        @IsString()
    @MinLength(6)
  

    password: string

}