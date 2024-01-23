import { Body, Controller, Post, Get, UseGuards , Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDecorator } from 'class-validator';
import { Registerdto } from './dto/register.dto';
import { logindto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { Roles } from './decorators/roles.decorators';
import { RolesGuard } from './guard/roles.guard';
import { Role } from './enums/role.enum';
import { Auth } from './decorators/auth.decorators';

interface RequestWitUser extends Request {
    user:{
        email:string;
        role: string;
    }
}

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}
@Post('register')
register(  @Body()
registerDto: Registerdto){
  

    return this.authService.regitser(registerDto)

}
@Post('login')
login(@Body()
loginrDto: logindto){
    return this.authService.login(loginrDto)
}

@Get('profile')
@Auth(Role.USER)
profile(@Req()
req:RequestWitUser){


    return this.authService.profile(req.user);

}

}
