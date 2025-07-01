import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsUUID } from "class-validator"

export class CreateFavoriteDto {


    @ApiProperty({example:"movieid"})
    @IsNotEmpty()
    @IsUUID()
    movie_id:string
}
