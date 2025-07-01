import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMovieFileDto } from './create-movie_file.dto';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MovieQuality } from 'src/core/types/user';

export class UpdateMovieFileDto  {

    @ApiProperty({example:"movie_id"})
    @IsNotEmpty()
    movie_id:string

    @ApiProperty({example:"480p"})
    @IsNotEmpty()
    @IsEnum(MovieQuality)
    quality:MovieQuality

    @ApiProperty({example:"Uzb"})
    @IsNotEmpty()
    @IsString()
    @IsNotEmpty()
    language: string;



}
