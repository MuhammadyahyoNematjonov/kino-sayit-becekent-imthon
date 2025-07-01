import { Column, DataType, Default, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { UserSubscription } from "./user_subscriptions.model";

@Table({tableName:"subscription_plans"})
export class SubscriptionPlan extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({type:DataType.UUID,onDelete: 'CASCADE'})
    declare id: string;
  
    @Column(DataType.STRING)
    name: string;
  
    @Column(DataType.DECIMAL(10, 2))
    price: number;
  
    @Column(DataType.INTEGER)
    duration_days: number;
  
    @Column(DataType.JSON)
    features: object;
  
    @Default(true)
    @Column(DataType.BOOLEAN)
    is_active: boolean;

    @HasMany(() => UserSubscription,)
    subscriptions: UserSubscription[];
  }