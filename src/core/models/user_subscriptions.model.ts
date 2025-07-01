
import { BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { SubscriptionPlan } from "./subscription_plans.model";
import {UserSubscriptionStatus } from "../types/user";
import { Payment } from "./payments.model";

@Table({ tableName: 'user_subscriptions' })
export class UserSubscription extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => User)
  @Column({type:DataType.UUID, onDelete: "CASCADE"})
  user_id: string;

  @ForeignKey(() => SubscriptionPlan)
  @Column({type:DataType.UUID, onDelete: "CASCADE"})
  plan_id: string;

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  start_date: Date;

  @Column(DataType.DATE)
  end_date: Date;

  @Default('pending_payment')
  @Column({type:DataType.ENUM(...Object.values(UserSubscriptionStatus))})
  status: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  auto_renew: boolean;

  @BelongsTo(() => User)
  users: User;

  @BelongsTo(() => SubscriptionPlan,)
  subscriptionplan  : SubscriptionPlan;

  @HasMany(()=>Payment,)
  payment:Payment


}