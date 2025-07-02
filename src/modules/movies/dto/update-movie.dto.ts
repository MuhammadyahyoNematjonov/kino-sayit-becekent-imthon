import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { subscriptionType } from 'src/core/types/user';

export class UpdateMovieDto {
  @ApiProperty({ example: 'Avatar 1' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'avatar-2' })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty({ example: 'Pandora sayyorasiga qaytish haqidagi film.' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 2023 })
  @IsNotEmpty()
  @IsNumber()
  release_year: number;

  @ApiProperty({ example: 195 })
  @IsNotEmpty()
  @IsNumber()
  duration_minutes: number;

  @ApiProperty({ example: 9.2 })
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @ApiProperty({ example: 'premium' })
  @IsNotEmpty()
  @IsEnum(subscriptionType)
  subscription_type: subscriptionType;

  @ApiProperty({ example: 'user_id' })
  @IsNotEmpty()
  @IsString()
  created_by: string;
}
