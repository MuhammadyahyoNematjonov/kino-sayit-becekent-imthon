import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateMovieCategoryDto  {

    @ApiProperty({example:"category_id"})
    @IsUUID()
    @IsNotEmpty()
    category_id:string

    @ApiProperty({example:"movie_id"})
    @IsUUID()
    @IsNotEmpty()
    movie_id:string
}
