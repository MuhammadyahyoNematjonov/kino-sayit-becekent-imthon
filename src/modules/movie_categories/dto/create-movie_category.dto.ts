import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsUUID } from "class-validator"

export class CreateMovieCategoryDto {

    @ApiProperty({example:"categoryid"})
    @IsUUID()
    @IsNotEmpty()
    category_id:string

    @ApiProperty({example:"movieid"})
    @IsUUID()
    @IsNotEmpty()
    movie_id:string
}
