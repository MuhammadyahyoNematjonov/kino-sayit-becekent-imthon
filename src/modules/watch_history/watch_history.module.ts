import { Module } from '@nestjs/common';
import { WatchHistoryService } from './watch_history.service';
import { WatchHistoryController } from './watch_history.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { WatchHistory } from 'src/core/models/watch_history.model';

@Module({
  imports:[SequelizeModule.forFeature([WatchHistory])],
  controllers: [WatchHistoryController],
  providers: [WatchHistoryService],
})
export class WatchHistoryModule {}
