import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { UserSubscriptionsService } from './user_subscriptions.service';
import { CreateUserSubscriptionDto } from './dto/create-user_subscription.dto';
import { UpdateUserSubscriptionDto } from './dto/update-user_subscription.dto';
import { Roles } from 'src/core/decorators/roles.decorator';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { RolesGuard } from 'src/core/guards/role-guard';
import { UserRole } from 'src/core/types/user';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags("User Subscription")
@Controller('api/user-subscriptions')
export class UserSubscriptionsController {
  constructor(private readonly userSubscriptionsService: UserSubscriptionsService) {}

  @Post("create")
  @Roles(UserRole.SuperAdmin, UserRole.Admin,UserRole.User)
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createUserSubscriptionDto: CreateUserSubscriptionDto,@Req() req:Request) {
    return this.userSubscriptionsService.create(createUserSubscriptionDto,req["user"].id);
  }

  @Get("all")  
  @Roles(UserRole.SuperAdmin, UserRole.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.userSubscriptionsService.findAll();
  }

  @Get('one/:id')
  @Roles(UserRole.SuperAdmin, UserRole.Admin,UserRole.User)
  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.userSubscriptionsService.findOne(id);
  }

  @Put('update/:id')
  @Roles(UserRole.SuperAdmin, UserRole.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateUserSubscriptionDto: UpdateUserSubscriptionDto) {
    return this.userSubscriptionsService.update(id, updateUserSubscriptionDto);
  }

  @Delete('delete/:id')
  @Roles(UserRole.SuperAdmin, UserRole.Admin,UserRole.User)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.userSubscriptionsService.remove(id);
  }
}
