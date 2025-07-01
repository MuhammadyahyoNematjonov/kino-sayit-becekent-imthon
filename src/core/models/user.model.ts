import { Table, Column, Model, DataType, PrimaryKey, Default, CreatedAt, HasOne, HasMany } from 'sequelize-typescript';
import { UserModule } from 'src/modules/users/user.module';
import { UserRole } from '../types/user';
import { Profile } from './profiles.model';
import { UserSubscription } from './user_subscriptions.model';
import { Favorite } from './favorites.model';
import { Movie } from './movies.model';
import { Review } from './reviews.model';
import { WatchHistory } from './watch_history.model';

@Table({ tableName: 'users'})
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({type:DataType.UUID,onDelete: 'CASCADE'})
  declare id: string;

  @Column({ type: DataType.STRING, unique: true })
  username: string;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column(DataType.STRING)
  password: string;

  @Default(UserRole.User)
  @Column({
    type:DataType.ENUM(...Object.values(UserRole))
  })
  role: string;



  @HasOne(() => Profile,)
  profile:Profile

  @HasMany(() => UserSubscription, )
  user_subscriptions: UserSubscription;


  @HasMany(() => Favorite, )
  favorites: Favorite;

  @HasMany(() => Review)
  reviews: Review;

  @HasMany(()=> WatchHistory)
  watchhistories:WatchHistory
}