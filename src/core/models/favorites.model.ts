import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { Movie } from "./movies.model";

@Table({ tableName: 'favorites' })
export class Favorite extends Model {
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

  @BelongsTo(()=> Movie,)
  movie:Movie

  @BelongsTo(()=>User, )
  user:User
}