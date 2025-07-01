import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionPlanDto } from './dto/create-subscription_plan.dto';
import { UpdateSubscriptionPlanDto } from './dto/update-subscription_plan.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SubscriptionPlan } from 'src/core/models/subscription_plans.model';
import { UserSubscription } from 'src/core/models/user_subscriptions.model';

@Injectable()
export class SubscriptionPlansService {
constructor(@InjectModel(SubscriptionPlan) private subcriptionplan:typeof SubscriptionPlan,){}

  async create(payload: Required<CreateSubscriptionPlanDto>) {
    let data = await this.subcriptionplan.create(payload)
      return data
  }

  findAll() {
    let data = this.subcriptionplan.findAll({
      include:[
        {
          model:UserSubscription
        }
      ]
    })

    return data
  }

 async findOne(id:string) {

    let data = await this.subcriptionplan.findByPk(id)

    return data
    
  }

  async update(id: string, updateSubscriptionPlanDto: UpdateSubscriptionPlanDto) {
    let oldsubcriptionplan = await this.subcriptionplan.findByPk(id)
    if(!oldsubcriptionplan) throw new NotFoundException()
    
    let  data = await this.subcriptionplan.update({...updateSubscriptionPlanDto},{where:{id}})

    return {
      message:"subcriptionplan updated",
      data
    } 
  }

 async remove(id: string) {
    
    let olduser = await this.subcriptionplan.findByPk(id)
    if(!olduser) throw new NotFoundException("subcriptionplan not found")

    await this.subcriptionplan.destroy({where:{id}})

    return {
      message:"subcriptionplan deleted",
      succase:true
    }
  }
}
