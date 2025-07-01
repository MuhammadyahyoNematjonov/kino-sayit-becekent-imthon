import { IsBoolean, IsNumber, IsOptional, IsString, IsJSON, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSubscriptionPlanDto {

  @ApiProperty({ example: 'Premium 1 oylik' })
  @IsString()
  name: string;

  @ApiProperty({ example: 25000 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 30 })
  @IsNumber()
  duration_days: number;

  @ApiProperty({ example: { resolution: "1080p", download: true, multi_device: true } })
  @IsObject()
   features: Record<string, any>;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}
