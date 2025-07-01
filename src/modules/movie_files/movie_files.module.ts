import { Module } from '@nestjs/common';
import { MovieFilesService } from './movie_files.service';
import { MovieFilesController } from './movie_files.controller';
import { MovieFile } from 'src/core/models/movie_files.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from 'src/core/models/movies.model';

@Module({
  imports:[SequelizeModule.forFeature([MovieFile,Movie])],

  controllers: [MovieFilesController],
  providers: [MovieFilesService],
})
export class MovieFilesModule {}
