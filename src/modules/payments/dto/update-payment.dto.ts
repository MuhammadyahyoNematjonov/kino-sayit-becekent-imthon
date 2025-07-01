import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment.dto';
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { PaymentMethod, PaymentStatus } from 'src/core/types/user';

export class UpdatePaymentDto  {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0' })
  @IsUUID()
  @IsNotEmpty()
  user_subscription_id: string;

  @ApiProperty({ example: 49900 }) 
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: 'click' }) 
  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @ApiProperty()
  @IsNotEmpty()
  payment_details: object;

  @ApiProperty({ example: 'pending' }) 
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @ApiProperty({ example: 'TRX1234567890UZ' })
  @IsString()
  external_transaction_id: string;
}
