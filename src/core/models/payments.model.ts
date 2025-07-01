import {BelongsTo,Column,DataType, Default,ForeignKey,Model,PrimaryKey,Table} from "sequelize-typescript";
  import { UserSubscription } from "./user_subscriptions.model";
  import { PaymentMethod, PaymentStatus } from "../types/user";
  
  @Table({ tableName: 'payments' })
  export class Payment extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;
  
    @ForeignKey(() => UserSubscription)
    @Column(DataType.UUID)
    user_subscription_id: string;
  
    @BelongsTo(() => UserSubscription, )
    user_subscription: UserSubscription;
  
    @Column(DataType.DECIMAL(10, 2))
    amount: number;
  
    // @ts-ignore
    @Column({ type: DataType.ENUM(...Object.values(PaymentMethod)) })
    payment_method: string;
  
    @Column(DataType.JSON)
    payment_details: object;
  
    // @ts-ignore
    @Column({ type: DataType.ENUM(...Object.values(PaymentStatus)) })
    status: string;
  
    @Column(DataType.STRING)
    external_transaction_id: string;
  }
  