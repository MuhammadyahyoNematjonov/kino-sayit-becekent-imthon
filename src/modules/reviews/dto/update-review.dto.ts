import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Max, Min } from "class-validator";

export class UpdateReviewDto {
    @ApiProperty({ example: "d4f3e21a-5d88-4c1f-9cbe-123456789abc" })
    @IsNotEmpty()
    movie_id: string;
  
    @ApiProperty({ example: 4 })
    @Min(1)
    @Max(5)
    rating: number;
  
    @ApiProperty({ example: "Juda zo'r film, tavsiya qilaman!" })
    @IsNotEmpty()
    comment: string;
}
