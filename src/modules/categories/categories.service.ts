import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from 'src/core/models/categories.model';
import { MovieCategory } from 'src/core/models/movie_categories.model';
import { Movie } from 'src/core/models/movies.model';
import { Model } from 'sequelize';
import { User } from 'src/core/models/user.model';
import { MovieFile } from 'src/core/models/movie_files.model';
import { Review } from 'src/core/models/reviews.model';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryService:typeof Category){}
  async create(payload: Required<CreateCategoryDto>) {
    let seeSlug = await this.categoryService.findOne({where:{slug:payload.slug}})
    
    if(seeSlug) throw new ConflictException("slug already created")
    let data = await this.categoryService.create(payload)

    return data
  
  }

  async findAll() {
    return await this.categoryService.findAll({
      include: [
        {
          model: MovieCategory,
          include: [
            {
              model: Movie,
              include: [
                MovieFile,
                Review,
                {
                  model: User,
            
                }
              ]
            }
          ]
        }
      ]
    });
  }
  
  

  async findOne(payload: any) {
    const allowedFields = ['id', 'name', 'slug', 'description'];

    for (const key in payload) {
    // @ts-ignore
      if (!allowedFields.includes(key)) {
        throw new ConflictException(`Noto'g'ri ustun ${key}`);
      }
    let data = await this.categoryService.findAll({
      where: {
        ...payload
      }

    })

    return data
  }
}

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {

    let data = await this.categoryService.findOne({
      where: {
        id
      }

    })
    if(!data) throw new NotFoundException("category not found ")

      let categoryUpdate = await this.categoryService.update(updateCategoryDto,{where:{id}})

    return {
      message:"category update",
      categoryUpdate
    }
  }
  

  async remove(id: number) {
     let data =await this.categoryService.destroy({
      where: {
        id
      }

    })
    if(!data) throw new NotFoundException("user not found ")

      return "Category o'chirildi."

  }

}