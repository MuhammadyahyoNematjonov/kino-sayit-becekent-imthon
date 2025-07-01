import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/core/models/user.model';
import { Profile } from 'src/core/models/profiles.model';
import { UserSubscription } from 'src/core/models/user_subscriptions.model';
import { Favorite } from 'src/core/models/favorites.model';
import { Review } from 'src/core/models/reviews.model';
import { WatchHistory } from 'src/core/models/watch_history.model';
import { Movie } from 'src/core/models/movies.model';
import { UserRole } from 'src/core/types/user';
import { CreateAdminDto } from './dto/create-admin.dto';
import { RegisterAuthDto } from '../auth/dto/auth.register.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private usermodel: typeof User) {}

    async findAll() {
        const data = await this.usermodel.findAll({
         
            include: [
                {
                    model: Profile,

                },
                {
                    model: UserSubscription,
                },
                {
                    model: Favorite,
                    include: [Movie], 
                },
                {
                    model: Review,
                    include: [Movie], 
                },
                {
                    model: WatchHistory,
                    include: [Movie], 
                },
            ],
        });
        return data;
    }

    async AddAdmin(payload:CreateAdminDto){
        let user =  await this.usermodel.findOne({where:{username:payload.username}}) 
        let email =  await this.usermodel.findOne({where:{email:payload.email}}) 
       
        if(user ) throw new ConflictException("username already")
        if(email ) throw new ConflictException("email already")

        let data = await this.usermodel.create({...payload,role:UserRole.Admin})

        return data
    }

    async delete(id:string){

       let data = await this.usermodel.destroy({where:{id}})

       if(!data) throw new NotFoundException("user id not found")

        return "deleted"
    }

    async update(payload:RegisterAuthDto,id:string){

        let data = await this.usermodel.update({...payload},{where:{id}})
 
        if(!data) throw new NotFoundException(" user id not found")
 
         return data
     }
}
