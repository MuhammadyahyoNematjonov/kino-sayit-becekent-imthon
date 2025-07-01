import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserSubscriptionDto {
  
  @ApiProperty({ example: '7d7f5c4e-12ab-4c1a-b234-91c3a3f8d1ff' })
  @IsUUID()
  @IsNotEmpty()
  plan_id: string;

  @ApiPropertyOptional({ example: '2025-07-01T00:00:00Z' })
  @IsDate()
  @IsOptional()
  start_date?: Date;

  @ApiPropertyOptional({ example: '2025-07-31T23:59:59Z' })
  @IsDate()
  @IsOptional()
  end_date?: Date;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  auto_renew?: boolean;
}
