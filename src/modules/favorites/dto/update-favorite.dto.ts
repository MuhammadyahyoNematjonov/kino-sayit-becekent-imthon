import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsUUID } from "class-validator"

export class UpdateFavoriteDto {


    @ApiProperty({example:"movieid"})
    @IsNotEmpty()
    @IsUUID()
    movie_id:string
}
