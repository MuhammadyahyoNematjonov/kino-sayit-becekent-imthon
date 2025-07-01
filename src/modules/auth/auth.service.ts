import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { JwtAccesToken, JwtRefreshToken } from 'src/common/config/jwt';
import { RedicService } from 'src/common/redic/redic.service';
import { User } from 'src/core/models/user.model';
import { checktoken } from 'src/core/types/user';
import { RegisterAuthDto, TokenDto, VerifyDto } from './dto/auth.register.dto';
import { MailerService } from 'src/common/mailer/mailer.service';
import { LoginAuthDto } from './dto/auth.register.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(@InjectModel(User) private UsermodelService:typeof User,private jwtService:JwtService,private Mailermodel:MailerService,
    private redic : RedicService
){}


    async generateToken(payload:Required<checktoken>,status?:boolean){
        const accessToken=await  this.jwtService.signAsync({...payload},JwtAccesToken)
        const refreshToken=await  this.jwtService.signAsync({...payload},JwtRefreshToken)
        console.log(accessToken,refreshToken,payload);
        
        
        if(!status){
           return {
              accessToken
            }
        }
           return{
              accessToken,
              refreshToken
            }
        
        }


    async register(payload:Required<RegisterAuthDto>){

        let User =  await this.UsermodelService.findOne({where:{username:payload.username}}) 
        let email =  await this.UsermodelService.findOne({where:{email:payload.email}}) 
       
        if(User ) throw new ConflictException("username already")
        if(email ) throw new ConflictException("email already")

        let code = Math.floor(Math.random() * 100000);

        await this.Mailermodel.sendEmail(payload.email,"Saitdan ro'yxatdan o'tish uchun",code)

        await  this.redic.set(`register:${payload.email}`,JSON.stringify({...payload,code}),400)    

        return {mesage:`bu emailingizga ${payload.email} xabar yuborildi.`}
           
        
    }

    
    async login(payload:Required<LoginAuthDto>){
    
        let User =  await this.UsermodelService.findOne({where:{email:payload.email}}) 
        if(!User) throw new NotFoundException("User not found")
            
        if (!payload.password || !User.dataValues.password) {
                throw new BadRequestException('Parol yoki foydalanuvchi malumoti yoq');
            }
        let compare = await bcrypt.compare(payload.password,User.dataValues.password)

        if(!compare) throw new NotFoundException("Password error")

        let tokens = await this.generateToken({id:User.dataValues.id,role:User.dataValues.role},true)

        return {
            tokens,
            data:User
        }
            

    }

    async checkToken(tokenDto: Required<TokenDto>) {
    
        try {
         let payload = await this.jwtService.verifyAsync(tokenDto.token);
         let tokens = await this.generateToken({ id: payload.id, role: payload.role }, false);
            
          return {
                ...tokens
                };
         } catch (error) {
            throw new UnauthorizedException(error.name)
         }
        
    }

    async verify(payload:VerifyDto){

            let text =await  this.redic.get(`register:${payload.email}`)
            if(!text) throw new BadRequestException("user not found or code expire")
            
            let data = JSON.parse(text)
            
            if(data.code !== payload.code) throw new BadRequestException("Incorrect code")

            let hashPassword = await bcrypt.hash(data.password,10)

            let createUser = await this.UsermodelService.create({
                email: payload.email,
                username: data.username, 
                password: hashPassword
              })
            this.redic.del(`register:${payload.email}`)
            let tokens = await this.generateToken({id:createUser.dataValues.id,role:createUser.dataValues.role},true)

              
            return {
                message: "Ro'yxatdan muvaffaqiyatli o'tdingiz",
                ...tokens,
                data:{
                   username:createUser.dataValues.username,
                   role:createUser.dataValues.role,
                   createdAt: createUser.createdAt,
                   updatedAt: createUser.updatedAt,
                }
            }
         }

     

        
    
    }


