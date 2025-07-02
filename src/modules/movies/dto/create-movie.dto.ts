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
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  release_year: number;

  @ApiProperty({ example: 148,})
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  duration_minutes: number;

  @ApiProperty({ example: 8.8,  })
  @Type(() => Number)
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

  @ApiProperty({ example: 1, })
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @ApiProperty({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({ example: 'avatar'})
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ example: 'free', })
  @IsOptional()
  @IsEnum(['free', 'premium'])
  subscription_type?: 'free' | 'premium';
}
