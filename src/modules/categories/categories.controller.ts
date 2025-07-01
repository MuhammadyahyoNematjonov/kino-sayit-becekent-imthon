import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, ParseIntPipe, Req, UseGuards} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { RolesGuard } from 'src/core/guards/role-guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { UserRole } from 'src/core/types/user';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags("Category")
@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('create')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SuperAdmin, UserRole.Admin)
  create( @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get('all')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SuperAdmin, UserRole.Admin)
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('one')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SuperAdmin, UserRole.Admin,UserRole.User)
  findOne(@Query() payload: any) {
    return this.categoriesService.findOne(payload);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SuperAdmin, UserRole.Admin)
  update(@Req() req: Request,@Param('id', ParseIntPipe) id: number,@Body() updateCategoryDto: UpdateCategoryDto,) {

    return this.categoriesService.update(id,updateCategoryDto);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SuperAdmin, UserRole.Admin)
  remove( @Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
