import { Controller, Get, Post, Body, Delete, Param, UploadedFile, UseInterceptors, UnsupportedMediaTypeException, Query, UseGuards } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { CreateMovieDto, MovieQueryDto } from "./dto/create-movie.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuidv4 } from "uuid";
import { Express } from "express";
import { UserRole } from "src/core/types/user";
import { Roles } from "src/core/decorators/roles.decorator";
import { AuthGuard } from "src/core/guards/jwt-guard";
import { RolesGuard } from "src/core/guards/role-guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ApiTags } from "@nestjs/swagger";
import { ApiConsumes } from "@nestjs/swagger";
import { ApiBody } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("Movies")
@Controller("api/movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post("create")
  @Roles(UserRole.SuperAdmin, UserRole.Admin, UserRole.User)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(
    FileInterceptor("poster", {
      storage: diskStorage({
        destination: "./uploads/posters",
        filename: (req, file, cb) => {
          const postername = uuidv4() + extname(file.originalname);
          cb(null, postername);
        }
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        // @ts-ignore
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(
            new UnsupportedMediaTypeException("type jpeg, jpg yoki png bo'lishi kerak"),
            false
          );
        }
        cb(null, true);
      }
    })
  )
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        poster: {
          type: "string",
          format: "binary"
        },
        title: {
          type: "string"
        },
        description: {
          type: "string"
        },
        release_date: {
          type: "string",
          format: "date"
        },
        duration: {
          type: "number"
        },
        age_limit: {
          type: "string"
        },
        country: {
          type: "string"
        }
      },
      required: ["title", "description", "poster"]
    }
  })
  async create(@Body() createMovieDto: CreateMovieDto, @UploadedFile() poster: Express.Multer.File) {
    const poster_url = poster.filename;
    return this.moviesService.create(createMovieDto, poster_url);
  }

  @Get("all")
  @Roles(UserRole.SuperAdmin, UserRole.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.moviesService.findAll();
  }

  @Get("one/query")
  @Roles(UserRole.SuperAdmin, UserRole.Admin, UserRole.User)
  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Query() payload: any) {
    return this.moviesService.findQueryAll(payload);
  }

  @Delete("delete/:id")
  @Roles(UserRole.SuperAdmin, UserRole.Admin, UserRole.User)
  @UseGuards(AuthGuard, RolesGuard)
  remowe(@Param("id") id: string) {
    return this.moviesService.remove(id);
  }
}
