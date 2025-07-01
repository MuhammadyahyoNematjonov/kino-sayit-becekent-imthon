import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsJWT, IsNotEmpty, IsString, Length } from "class-validator"

export class RegisterAuthDto{

    @ApiProperty({example:"Muhammadyahyo"})
    @IsNotEmpty()
    @Length(3,40)
    @IsString()
    username:string

    @ApiProperty({example:"********@gmail.com"})
    @IsEmail()
    @IsNotEmpty()
    email:string

    @ApiProperty({example:"12345678"})
    @IsNotEmpty()
    @IsString()
    @Length(6,25)
    password:string
}

export class LoginAuthDto{


    @ApiProperty({example:"********@gmail.com"})
    @IsEmail()
    @IsNotEmpty()
    email:string

    @ApiProperty({example:"123456789"})
    @IsNotEmpty()
    @IsString()
    @Length(6,25)
    password:string
}

export class TokenDto { 

    @ApiProperty({example:"token"})
    @IsNotEmpty()
    @IsJWT()
    token:string
}

export class VerifyDto { 

    @ApiProperty({example:"32322"})
    @IsNotEmpty()
    code:number

    @ApiProperty({example:"*********@gmail.com"})
    @IsNotEmpty()
    @IsEmail()
    email:string
}