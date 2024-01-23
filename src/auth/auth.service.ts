import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Registerdto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { logindto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor( private readonly usersService: UsersService,
        private readonly jwtService: JwtService){

    }

  async  regitser({ password, email, name }: Registerdto){
    const user = await this.usersService.findOneEmail(email);

    if (user) {
      throw new BadRequestException("Email already exists");
    }
 
    await this.usersService.create({ 
            password:  await bcryptjs.hash(password,10),
            email, 
            name })

            return {name, email}
    }

   async login({ password, email }: logindto){
        const userfound = await this.usersService.findOneEmail(email)
        if (!userfound ){
                throw new UnauthorizedException('email is wrong')
            }
                const Ispassword = await bcryptjs.compare(password, userfound.password);
            if (!Ispassword ){
                 throw new UnauthorizedException('password is wrong')
                        }
                    const payload ={email: userfound.email, role: userfound.role}
                    const toke = await this.jwtService.signAsync(payload);
                return {toke, }

    }

async profile({email, role}:{email:string; role: string}){

if(role !== 'admin'){
    throw new UnauthorizedException('You are not autherized to access')
}

    return await this.usersService.findOneEmail(email)

}
  
}
