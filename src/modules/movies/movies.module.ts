import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MovieFilesController } from '../movie_files/movie_files.controller';
import { MovieFile } from 'src/core/models/movie_files.model';
import { MovieFilesService } from '../movie_files/movie_files.service';
import { Movie } from 'src/core/models/movies.model'; 
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Category } from 'src/core/models/categories.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      MovieFile,
      Movie,
      Category
    ])
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
