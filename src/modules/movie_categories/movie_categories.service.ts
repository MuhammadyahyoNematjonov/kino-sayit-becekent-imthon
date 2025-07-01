import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieCategoryDto } from './dto/create-movie_category.dto';
import { UpdateMovieCategoryDto } from './dto/update-movie_category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MovieCategory } from 'src/core/models/movie_categories.model';
import { Category } from 'src/core/models/categories.model';
import { Movie } from 'src/core/models/movies.model';
import { User } from 'src/core/models/user.model';

@Injectable()
export class MovieCategoriesService {
  constructor(@InjectModel(MovieCategory) private movieCategoryService: typeof MovieCategory) {}

  async findAll() {
    let data = await this.movieCategoryService.findAll({
      include: [
        { model: Category },
        { model: Movie, include: [User] }
      ]
    });
    return data;
  }

  async create(payload: Required<CreateMovieCategoryDto>) {
    let status = await this.movieCategoryService.findOne({
     
         where: {
        movie_id: payload.movie_id,
        category_id: payload.category_id
      
      }
    });

    if (status) throw new ConflictException("Bu movie category allaqachon mavjud");

    let data = await this.movieCategoryService.create(payload);
    return data;
  }


  async findOne(payload: any) {
    const allowedFields = ['id', 'category_id', 'movie_id'];

    for (const key in payload) {
      // @ts-ignore
      if (!allowedFields.includes(key)) {
        throw new ConflictException(`Noto'g'ri ustun ${key}`);
      }
  
    }


    let data = await this.movieCategoryService.findAll({
    
      where: { ...payload }
    });

    return data;
  }

  async update(id: string, updateCategoryDto: UpdateMovieCategoryDto) {
    
    let data = await this.movieCategoryService.findOne({ where: { id } });

    if (!data) throw new NotFoundException("MovieCategory topilmadi");

    let categoryUpdate = await this.movieCategoryService.update(updateCategoryDto, { where: { id } });

    return {
      message: "Ma'lumot yangilandi",
    
      data: categoryUpdate
    };
  }

  async remove(id: string) {
    let data = await this.movieCategoryService.destroy({ where: { id } });

    if (!data) throw new NotFoundException("MovieCategory topilmadi");

    return "MovieCategory o'chirildi";
  }
}
