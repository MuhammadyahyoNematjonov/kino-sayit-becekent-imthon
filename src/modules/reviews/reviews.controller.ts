import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Roles } from 'src/core/decorators/roles.decorator';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { RolesGuard } from 'src/core/guards/role-guard';
import { UserRole } from 'src/core/types/user';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';



@ApiBearerAuth()
@ApiTags("Review")
@Controller('api/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post("create")
  @Roles(UserRole.SuperAdmin, UserRole.Admin,UserRole.User)
  @UseGuards(AuthGuard, RolesGuard)
  create(@Req() req:Request,@Body() createreviewDto: CreateReviewDto) {

    return this.reviewsService.create(createreviewDto,req["user"].id);
  }

  @Get("all")
  @Roles(UserRole.SuperAdmin, UserRole.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get('one/:id')
  @Roles(UserRole.SuperAdmin, UserRole.Admin,UserRole.User)
  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  @Put('update/:id')
  @Roles(UserRole.SuperAdmin, UserRole.Admin,UserRole.User)
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete('delete/:id')
  @Roles(UserRole.SuperAdmin, UserRole.Admin,UserRole.User)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }
}
