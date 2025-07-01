import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto{

    @ApiProperty({example:"Kulguli"})
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiProperty({example:"xayajonli"})
    @IsNotEmpty()
    slug:string

    @ApiProperty({example:"Merlin"})
    @IsString()
    @IsNotEmpty()
    description:string
}
