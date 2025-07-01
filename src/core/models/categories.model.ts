import { BelongsTo, Column, DataType, Default, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { MovieCategory } from "./movie_categories.model";
import { User } from "./user.model";

@Table({ tableName: 'categories' })
export class Category extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column(DataType.STRING)
  name: string;

  @Column({ type: DataType.STRING, unique: true })
  slug: string;

  @Column(DataType.TEXT)
  description: string;


  @HasMany(()=> MovieCategory)
  moviecategory:MovieCategory

  
}
