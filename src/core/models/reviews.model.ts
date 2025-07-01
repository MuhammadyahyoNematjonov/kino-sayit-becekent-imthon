import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { Movie } from "./movies.model";

@Table({ tableName: 'reviews' })
export class Review extends Model {
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
  rating: number;

  @Column(DataType.TEXT)
  comment: string;

  @BelongsTo(()=>User,)
  users:User

  @BelongsTo(()=>Movie,)
  movies:Movie

}