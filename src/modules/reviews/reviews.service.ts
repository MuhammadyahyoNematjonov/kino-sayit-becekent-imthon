import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Review } from "src/core/models/reviews.model";
import { User } from "src/core/models/user.model";
import { Movie } from "src/core/models/movies.model";

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review) private reviewmodel: typeof Review,
              @InjectModel(User) private usermodel: typeof User,
              @InjectModel(Movie) private moviewmodel: typeof Movie
            ) {}

  async create(createReviewDto: Required<CreateReviewDto>,user_id:string) {
    const {movie_id } = createReviewDto;

    const status = await this.reviewmodel.findOne({
      where: { user_id, movie_id },
    });

    const olduser = await this.usermodel.findOne({
      where: { user_id },
    });


    const oldmovie = await this.moviewmodel.findOne({
      where: { movie_id },
    });

    if(!oldmovie || !olduser){
      throw new NotFoundException("movie or user not found")
    }

    if (status) {
      throw new ConflictException("Siz bu kinoga allaqachon fikr bildirgansiz");
    }

    const review = await this.reviewmodel.create(createReviewDto);

    return {
      message: "muvaffaqiyatli yaratldi",
      data: {review,oldmovie,olduser},
    };
  }

  async findAll() {
    const data = await this.reviewmodel.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Movie,
        },
      ],
    });

    return data;
  }

  async findOne(id: string) {
    const review = await this.reviewmodel.findByPk(id, {
      include: [User, Movie],
    });

    if (!review) {
      throw new NotFoundException("Sharh topilmadi");
    }

    return review;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewmodel.findByPk(id);

    if (!review) {
      throw new NotFoundException("Sharh topilmadi");
    }

    await this.reviewmodel.update(updateReviewDto, { where: { id } });

    return {
      message: "Sharh yangilandi",
      data: await this.reviewmodel.findByPk(id),
    };
  }

  async remove(id: string) {
    const count = await this.reviewmodel.destroy({ where: { id } });

    if (!count) {
      throw new NotFoundException("Sharh topilmadi");
    }

    return {
      message: "Sharh o'chirildi",
    };
  }
}
