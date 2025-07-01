import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtAccesToken } from 'src/common/config/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService:JwtService){}
 async canActivate(context: ExecutionContext){
    let request = context.switchToHttp().getRequest();
    
    let token =this.tokentekshir(request)
   
    if(!token) throw new UnauthorizedException()

    try {
        let accessToken = await this.jwtService.verifyAsync(token,JwtAccesToken)
        request["user"] = accessToken
        return true

    } catch (error) {
        throw new UnauthorizedException(error.name)
    }
  }

  tokentekshir(request:Request){

    let [type,token] = request.headers.authorization?.split(" ") || [] 
    
    return type=="Bearer"?token:undefined
  }
}
