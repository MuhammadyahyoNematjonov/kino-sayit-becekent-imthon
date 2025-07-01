import { Controller, Get, Post, Body, Patch, Req, Delete, UseGuards, Put, Param, ParseFloatPipe, ParseIntPipe } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { RolesGuard } from 'src/core/guards/role-guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { UserRole } from 'src/core/types/user';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags("Favorite")
@Controller('api/favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @Roles(UserRole.SuperAdmin, UserRole.Admin, UserRole.User)
  @UseGuards(AuthGuard, RolesGuard)
  create(@Req() req: Request, @Body() createFavoriteDto: CreateFavoriteDto) {
    const user_id = req["user"].id;
    return this.favoritesService.create(createFavoriteDto ,user_id );
  }

  @Get('all')
  @Roles(UserRole.SuperAdmin, UserRole.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.favoritesService.findAll();
  }

  @Get("one")
  @Roles(UserRole.SuperAdmin, UserRole.Admin,UserRole.User)
  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Req() req: Request) {
    const user_id = req["user"].id;
    return this.favoritesService.findOne({ user_id });
  }

  @Put("update/:id")
  @Roles(UserRole.SuperAdmin, UserRole.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  update(@Req() req: Request,@Param("id") id:string, @Body() updateFavoriteDto: UpdateFavoriteDto) {
    return this.favoritesService.update(id, updateFavoriteDto);
  }

  @Delete("delete")
  @Roles(UserRole.SuperAdmin, UserRole.Admin,UserRole.User)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Req() req: Request) {
    const user_id = req["user"].id;
    return this.favoritesService.remove(user_id);
  }
}
