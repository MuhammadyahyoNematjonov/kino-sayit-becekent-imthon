import { Injectable } from '@nestjs/common';
import { CreateWatchHistoryDto } from './dto/create-watch_history.dto';
import { UpdateWatchHistoryDto } from './dto/update-watch_history.dto';
import { InjectModel } from '@nestjs/sequelize';
import { WatchHistory } from 'src/core/models/watch_history.model';
import { User } from 'src/core/models/user.model';
import { Movie } from 'src/core/models/movies.model';

@Injectable()
export class WatchHistoryService {
  constructor(@InjectModel(WatchHistory) private watchHistoryModel: typeof WatchHistory){}


  async findAll() {
    let data = this.watchHistoryModel.findAll({
      include:[
        {
          model:User
        },
        {
          model:Movie
        }
      ]
    })


    return data
  }

  async updateWatchHistory(dto: CreateWatchHistoryDto,user_id:string) {
    let status = await this.watchHistoryModel.findOne({
      where: {
        user_id: user_id,
        movie_id: dto.movie_id,
      },
    });

    if (status) {
      status.watched_duration = dto.watched_duration;
      status.watched_percentage = dto.watched_percentage;
      status.last_watched = new Date();
     
      await status.save();
      
      return status;
    } else {
        let data = await this.watchHistoryModel.create({...dto,last_watched: new Date(),});

        return data
    }
  }

}
