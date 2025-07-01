import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Favorite } from 'src/core/models/favorites.model';
import { User } from 'src/core/models/user.model';
import { Movie } from 'src/core/models/movies.model';

@Injectable()
export class FavoritesService {
  constructor(@InjectModel(Favorite) private favoriteService:typeof Favorite,
              @InjectModel(User) private usermodel: typeof User,
              @InjectModel(Movie) private moviemodel: typeof Movie

){}


  async findAll() {
     let data =await this.favoriteService.findAll({include:[
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

  async create(payload: Required<CreateFavoriteDto>,user_id:string) {
    
    let movie = await this.moviemodel.findAll({where:{id:payload.movie_id}})
    let user = await this.usermodel.findAll({where:{id:user_id}})
    if(!movie || !user) throw new ConflictException("movie or user id not found")

    let data = await this.favoriteService.create(payload)

    return data
  }


  async findOne(payload: any) {
    let allowedFields = ['id', 'user_id', 'movie_id'];
  
    for(let key in payload) {
      // @ts-ignore
      if(!allowedFields.includes(key)) {
        throw new ConflictException(`Noto'g'ri ustun: ${key}`);
      }
    }
  
    let movie = await this.moviemodel.findOne({ where: { id: payload.movie_id } });
    let user = await this.usermodel.findOne({ where: { id: payload.user_id } });
  
    if (!movie || !user) {
      throw new ConflictException("Movie yoki User topilmadi");
    }
  
    let data = await this.favoriteService.findAll({
      where: { ...payload },
      include: [User, Movie]
    });
  
    return data;
  }
  

  async update(id: string, payload: UpdateFavoriteDto) {

    let data = await this.favoriteService.findOne({ where: { id } });
    if (!data) throw new NotFoundException("Favorite topilmadi");

    let favorite = await this.favoriteService.update(payload,{where:{id}})

    return {
      message:"Malumot o'zgartirildi.",
      data:favorite 
    }
  }
  

  async remove(id: number) {
     let data =await this.favoriteService.destroy({
      where: {
        id
      }

    })
    if(!data) throw new NotFoundException("user not found ")

      return "favorite o'chirildi."

  }

}
