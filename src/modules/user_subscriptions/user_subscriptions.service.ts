import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserSubscriptionDto } from './dto/create-user_subscription.dto';
import { UpdateUserSubscriptionDto } from './dto/update-user_subscription.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserSubscription } from 'src/core/models/user_subscriptions.model';
import { User } from 'src/core/models/user.model';
import { SubscriptionPlan } from 'src/core/models/subscription_plans.model';
import { UserRole } from 'src/core/types/user';

@Injectable()
export class UserSubscriptionsService {
  constructor(@InjectModel(UserSubscription) private userSubcription:typeof UserSubscription,
             @InjectModel(SubscriptionPlan) private Subcriptionplane:typeof SubscriptionPlan
            ){
  }
  async create(payload: CreateUserSubscriptionDto,user_id:string) {
    let { auto_renew, plan_id } = payload;
  
    let old_id = await this.Subcriptionplane.findOne({where:{id:plan_id}})
    if(!old_id) throw new ConflictException(" Subcriptionplane id not found")

    let startDate = new Date();
    let endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000); 
  
    let data = await this.userSubcription.create({
      ...payload,
      start_date: startDate,
      end_date: endDate,
      user_id
    });
  
    return data;
  }
  

  async findAll() {
    let data = await this.userSubcription.findAll({
      include:[
        {
          model:User
        },
        {
          model:SubscriptionPlan
        }
      ]
    })

    return data
  }

  async findOne(id: string) {
    
    let data = await this.userSubcription.findByPk(id)
    if(!data) throw new NotFoundException("UserSubcription id not found ")

      return data
  }

  async update(id: string, payload: UpdateUserSubscriptionDto) {
    let data = await this.userSubcription.update({...payload},{where:{id}})

    if(!data) throw new NotFoundException("UserSubcription id not found ")
    
      return data
  }

  async remove(id: string) {
    
    let data = await this.userSubcription.destroy({where:{id}})
    if(!data) throw new NotFoundException("UserSubcription id not found ")

      return {
        message:"UserSubcription deleted",
        succase:true
      }
  }
}
