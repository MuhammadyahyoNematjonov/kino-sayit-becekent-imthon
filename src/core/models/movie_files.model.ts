import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Movie } from "./movies.model";
import { MovieQuality } from "../types/user";

@Table({ tableName: 'movie_files' })
export class MovieFile extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => Movie)
  @Column({type:DataType.UUID, onDelete: "CASCADE"})
  movie_id: string;

  @Column(DataType.STRING)
  file_url: string;

//   @ts-ignore
  @Column({type:DataType.ENUM(...Object.values(MovieQuality))})
  quality: string;

  @Default('uz')
  @Column(DataType.STRING)
  language: string;

  @BelongsTo(()=>Movie,)
  movie:Movie
}