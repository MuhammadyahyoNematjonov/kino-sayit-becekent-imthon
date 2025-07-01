import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { MovieQuality } from "src/core/types/user";

export class CreateMovieFileDto {


    @ApiProperty({example:"movie_id"})
    @IsNotEmpty()
    movie_id:string

    @ApiProperty({example:"360p"})
    @IsNotEmpty()
    @IsEnum(MovieQuality)
    quality:MovieQuality

    @ApiProperty({example:"Uzb"})
    @IsNotEmpty()
    @IsString()
    @IsNotEmpty()
    language: string;



}
