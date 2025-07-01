import { Module } from '@nestjs/common';
import { MovieCategoriesService } from './movie_categories.service';
import { MovieCategoriesController } from './movie_categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MovieCategory } from 'src/core/models/movie_categories.model';

@Module({
  imports:[SequelizeModule.forFeature([MovieCategory])],

  controllers: [MovieCategoriesController],
  providers: [MovieCategoriesService],
})
export class MovieCategoriesModule {}
