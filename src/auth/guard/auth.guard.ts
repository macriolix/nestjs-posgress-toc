import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as request from 'supertest';
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../constants/jwt.constants"
@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private readonly jwtService: JwtService  ){

  }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    
    const toke = this.extractTokenFromHeader(request)
    if(!toke){
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(toke);
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }


    return true;


  }
  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
