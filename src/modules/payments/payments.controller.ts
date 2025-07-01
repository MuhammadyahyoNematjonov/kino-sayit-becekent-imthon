import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { RolesGuard } from 'src/core/guards/role-guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { UserRole } from 'src/core/types/user';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags("Payment")
@Controller('api/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("create")
  @Roles(UserRole.SuperAdmin, UserRole.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get("all")
  @Roles(UserRole.SuperAdmin, UserRole.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.paymentsService.findAll();
  }


}
