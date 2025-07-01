import { ForeignKey, BelongsTo, Table, Default, Column, DataType, PrimaryKey, Model } from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'profiles' })
export class Profile extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => User)
  @Column({type:DataType.UUID, onDelete: "CASCADE"})
  user_id: string;

  @BelongsTo(() => User,{ 
   
    as: 'mainProfile' })
  user: User;

  @Column(DataType.STRING)
  full_name: string;

  @Default("")
  @Column(DataType.STRING)
  avatar_url: string;

  @Column(DataType.STRING)
  phone: string;

  @Column(DataType.STRING)
  country: string;


}