import { IsNotEmpty, IsString, IsUUID, IsOptional, IsPhoneNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({ example: '7f9c08b7-12ab-4d5a-b234-9e4c1a3b8d1e' })
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({ example: 'Muhammadyahyo Nematjonov 👌' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiPropertyOptional({ example: '+998-88-373-03-31' })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiPropertyOptional({ example: 'Fargana' })
  @IsOptional()
  @IsString()
  country?: string;
  
}
