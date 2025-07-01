import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { WatchHistoryService } from './watch_history.service';
import { CreateWatchHistoryDto } from './dto/create-watch_history.dto';
import { UpdateWatchHistoryDto } from './dto/update-watch_history.dto';
import { Roles } from 'src/core/decorators/roles.decorator';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { RolesGuard } from 'src/core/guards/role-guard';
import { UserRole } from 'src/core/types/user';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags("Watch History")
@Controller('api/watch-history')
export class WatchHistoryController {
  constructor(private readonly watchHistoryService: WatchHistoryService) {}

  @Post()
  @Roles(UserRole.SuperAdmin, UserRole.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  UpdateWatchHistory(@Body() payload:CreateWatchHistoryDto,@Req() req:Request){
    return this.watchHistoryService.updateWatchHistory(payload,req["user"].id)
  }

  @Get("all")
  @Roles(UserRole.SuperAdmin, UserRole.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.watchHistoryService.findAll();
  }


}
