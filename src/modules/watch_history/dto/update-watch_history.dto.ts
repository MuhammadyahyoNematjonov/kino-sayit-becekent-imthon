import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateWatchHistoryDto  {

  @ApiProperty({ example: 'bcd1234f-5678-90ab-cdef-1234567890ab' })
  @IsNotEmpty()
  @IsString()
  movie_id: string;

  @ApiProperty({ example: 720 }) 
  @IsNotEmpty()
  @IsNumber()
  watched_duration: number;

  @ApiProperty({ example: 35.5 }) 
  @IsNotEmpty()
  @IsNumber()
  watched_percentage: number;
}
