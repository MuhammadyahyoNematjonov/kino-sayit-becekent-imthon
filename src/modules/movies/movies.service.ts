import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateMovieDto, MovieQueryDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Movie } from "src/core/models/movies.model";
import { User } from "src/core/models/user.model";
import { Category } from "src/core/models/categories.model";
import { Op } from "sequelize";
import * as fs from "fs"
import * as path from "path"

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie) private movieService: typeof Movie,
              @InjectModel(Category) private categoryModel: typeof Category
) {}

  async create(payload: CreateMovieDto, poster_url: string) {
    let slug = await this.movieService.findOne({where:{slug:payload.slug}})
    if(slug) throw new BadRequestException("slud already")
    const data = await this.movieService.create({ ...payload, poster_url });
    return {
      message: "Movie muvaffaqiyatli qo'shildi",
      data,
    };
  }

  async findAll() {
 
    let data = await this.movieService.findAll({
      include:[{
        model:Movie,
        include:[User]
      }
      ]
    })


    return data
  }

  async findQueryAll(payload: Required<MovieQueryDto>) {



  let page = payload.page || 1;
  let limit = payload.limit || 20;
  let offset = (page - 1) * limit;

  let where: any = {};

  if (payload.search) {
    where.title = { [Op.iLike]: `%${payload.search}%` };
  }

  if (payload.subscription_type) {
    where.subscription_type = payload.subscription_type;
  }



  let movies = await this.movieService.findAll  ({
    where,
   limit,offset

  });

  let total = await this.movieService.count()

    return {
    data:{movies},
    pagination:{
      page,
      limit,
      total
    }
    
    
  };

}
  
  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieService.findByPk(id);
    if (!movie) throw new NotFoundException("Movie topilmadi");

    await this.movieService.update(updateMovieDto, { where: { id } });

    return {
      message: "Movie yangilandi",
      update: updateMovieDto,
    };
  }



  async remove(id: string) {
    let deleted = await this.movieService.findByPk(id);

    if (!deleted) throw new NotFoundException("Movie file topilmadi");
    const poster = deleted.poster_url
    const filePath = path.join(process.cwd(),'uploads', 'posters', poster);
  
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

 await this.movieService.destroy({where:{id}});

    return {
      message: "Video  o'chirildi",
    };
  }
}

