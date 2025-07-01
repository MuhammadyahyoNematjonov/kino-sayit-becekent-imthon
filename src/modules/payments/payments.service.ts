import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from 'src/core/models/payments.model';
import { UserSubscription } from 'src/core/models/user_subscriptions.model';
import { User } from 'src/core/models/user.model';
import { SubscriptionPlan } from 'src/core/models/subscription_plans.model';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payment) private paymentService: typeof Payment,
              @InjectModel(UserSubscription) private userSubscriptionModel: typeof UserSubscription) {}

  async create(payload: Required<CreatePaymentDto>) {
    const subscription = await this.userSubscriptionModel.findOne({
      where: { id: payload.user_subscription_id },
    });

    if (!subscription) {
      throw new ConflictException("Bunday user_subscription mavjud emas");
    }
    let newusersubscription = await this.userSubscriptionModel.update({status:true},{where:{id:payload.user_subscription_id}})

    const payment = await this.paymentService.create(payload);
    return {
      message: "To'lov muvaffaqiyatli qo'shildi",
      data: {
        payment,newusersubscription
      }
    };
  }

  async findAll() {
    const data = await this.paymentService.findAll({
      include: [
        {
          model: UserSubscription,
          include: [User, SubscriptionPlan],
        }
      ]
    });

    return data;
  }
}
