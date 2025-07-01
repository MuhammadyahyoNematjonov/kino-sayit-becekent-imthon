import {Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile,UseInterceptors, Put, UseGuards} from '@nestjs/common';
import { MovieFilesService } from './movie_files.service';
import { CreateMovieFileDto } from './dto/create-movie_file.dto';
import { UpdateMovieFileDto } from './dto/update-movie_file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { UserRole } from 'src/core/types/user';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { RolesGuard } from 'src/core/guards/role-guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags, ApiConsumes, ApiBody} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags("Movie Files")
@Controller('api/movie-files')
export class MovieFilesController {
  constructor(private readonly movieFilesService: MovieFilesService) {}

  @Post("create")
  @Roles(UserRole.SuperAdmin, UserRole.Admin, UserRole.User)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/files',
        filename: (req, file, cb) => {
          const filename = uuidv4() + extname(file.originalname);
          cb(null, filename);
        }
      }),
    }),
  )
  @ApiConsumes('multipart/form-data') 
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
      file: {
      type: 'string',
      format: 'binary'
           },
      movie_id: {
      type: 'string',
      format: 'uuid'
       },
      quality: {
      type: 'string',
      enum: ['LOW', 'MEDIUM', 'HIGH', 'ULTRA'] 
        },
      language: {
        type: 'string'
        }
      },
      required: ['movie_id', 'quality', 'language']
    }
  })
  async create(@Body() createMovieFileDto: CreateMovieFileDto,@UploadedFile() file: Express.Multer.File
  ) {
    const filename = file.filename;
    return this.movieFilesService.create(createMovieFileDto, filename);
  }

  @Get('all')
  @Roles(UserRole.SuperAdmin, UserRole.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.movieFilesService.findAll();
  }

  @Get('one/:id')
  @Roles(UserRole.SuperAdmin, UserRole.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.movieFilesService.findOne(id);
  }

  @Put(':id')
  @Roles(UserRole.SuperAdmin, UserRole.Admin, UserRole.User)
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateMovieFileDto: UpdateMovieFileDto) {
    return this.movieFilesService.update(id, updateMovieFileDto);
  }

  @Delete(':id')
  @Roles(UserRole.SuperAdmin, UserRole.Admin, UserRole.User)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.movieFilesService.remove(id);
  }
}
