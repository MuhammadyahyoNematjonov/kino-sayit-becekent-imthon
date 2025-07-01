import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment } from 'src/core/models/payments.model';
import { UserSubscription } from 'src/core/models/user_subscriptions.model'; 

@Module({
  imports: [
    SequelizeModule.forFeature([
      Payment,
      UserSubscription 
    ])
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
