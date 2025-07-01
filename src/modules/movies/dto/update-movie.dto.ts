import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { subscriptionType } from 'src/core/types/user';

export class UpdateMovieDto {
  @ApiPropertyOptional({ example: 'Avatar 1' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'avatar-2' })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiPropertyOptional({ example: 'Pandora sayyorasiga qaytish haqidagi film.' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiPropertyOptional({ example: 2023 })
  @IsNotEmpty()
  @IsNumber()
  release_year: number;

  @ApiPropertyOptional({ example: 195 })
  @IsNotEmpty()
  @IsNumber()
  duration_minutes: number;

  @ApiPropertyOptional({ example: 9.2 })
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @ApiPropertyOptional({ example: 'premium' })
  @IsNotEmpty()
  @IsEnum(subscriptionType)
  subscription_type: subscriptionType;

  @ApiPropertyOptional({ example: 'user_id' })
  @IsNotEmpty()
  @IsString()
  created_by: string;
}
