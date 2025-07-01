import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { Movie } from "./movies.model";

@Table({ tableName: 'watch_history' })
export class WatchHistory extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => User)
  @Column({type:DataType.UUID, onDelete: "CASCADE"})
  user_id: string;

  @ForeignKey(() => Movie)
  @Column({type:DataType.UUID, onDelete: "CASCADE"})
  movie_id: string;

  @Column(DataType.INTEGER)
  watched_duration: number;

  @Column(DataType.DECIMAL(5, 2))
  watched_percentage: number;

  @Default(DataType.NOW)
  @Column({ field: 'last_watched', type: DataType.DATE })
  last_watched: Date;

  @BelongsTo(()=> User,)
  users:User

  @BelongsTo(()=> Movie,)
  movies:Movie
}
