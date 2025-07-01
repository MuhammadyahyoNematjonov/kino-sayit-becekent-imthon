import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsEnum,IsOptional } from 'class-validator';
import { subscriptionType } from 'src/core/types/user';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';


export class CreateMovieDto {

  @ApiProperty({ example: 'Inception'})
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'inception-2010',})
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty({ example: 'bu qyerda xakerlik xaqida kinolar bor.'})
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 2010, })
  @IsNotEmpty()
  @IsNumber()
  release_year: number;

  @ApiProperty({ example: 148,})
  @IsNotEmpty()
  @IsNumber()
  duration_minutes: number;

  @ApiProperty({ example: 8.8,  })
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @ApiProperty({ example: 'premium'})
  @IsNotEmpty()
  @IsEnum(subscriptionType)
  subscription_type: subscriptionType;

  @ApiProperty({ example: 'dc0f31a0-8f12-4cf4-91cb-2e68b92f4a89',  })
  @IsNotEmpty()
  @IsString()
  created_by: string;
}



export class MovieQueryDto {

  @ApiPropertyOptional({ example: 1, })
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional({ example: 'avatar'})
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 'free', })
  @IsOptional()
  @IsEnum(['free', 'premium'])
  subscription_type?: 'free' | 'premium';
}
