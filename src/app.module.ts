import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { SubscriptionPlansModule } from './modules/subscription_plans/subscription_plans.module';
import { UserSubscriptionsModule } from './modules/user_subscriptions/user_subscriptions.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { MoviesModule } from './modules/movies/movies.module';
import { MovieCategoriesModule } from './modules/movie_categories/movie_categories.module';
import { MovieFilesModule } from './modules/movie_files/movie_files.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { WatchHistoryModule } from './modules/watch_history/watch_history.module';
import { MailerModule } from './common/mailer/mailer.module';
import { RedicService } from './common/redic/redic.service';
import { RedicModule } from './common/redic/redic.module';
import { User } from './core/models/user.model';
import { WatchHistory } from './core/models/watch_history.model';
import { Review } from './core/models/reviews.model';
import { Movie } from './core/models/movies.model';
import { MovieCategory } from './core/models/movie_categories.model';
import { MovieFile } from './core/models/movie_files.model';
import { Payment } from './core/models/payments.model';
import { SubscriptionPlan } from './core/models/subscription_plans.model';
import { UserSubscription } from './core/models/user_subscriptions.model';
import { Favorite } from './core/models/favorites.model';
import { Profile } from './core/models/profiles.model';
import { Category } from './core/models/categories.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT') || '5432'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        models: [
          User,
          SubscriptionPlan,
          UserSubscription,
          Payment,
          Movie,
          WatchHistory,
          Review,
          MovieFile,
          MovieCategory,
          Favorite,
          Profile,
          Category,
        ],
        autoLoadModels: true,
        synchronize: true,

        // MUHIM: SSL sozlamalari Render PostgreSQL uchun
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        logging: false
      }),
    }),

    ServeStaticModule.forRoot(
      {
        rootPath: join(process.cwd(), 'uploads', 'avatar_url'),
        serveRoot: '/avatar',
      },
      {
        rootPath: join(process.cwd(), 'uploads', 'files'),
        serveRoot: '/file',
      },
      {
        rootPath: join(process.cwd(), 'uploads', 'posters'),
        serveRoot: '/poster',
      },
    ),

    AuthModule,
    UserModule,
    ProfilesModule,
    SubscriptionPlansModule,
    UserSubscriptionsModule,
    PaymentsModule,
    CategoriesModule,
    MoviesModule,
    MovieCategoriesModule,
    MovieFilesModule,
    FavoritesModule,
    ReviewsModule,
    WatchHistoryModule,
    MailerModule,
    RedicModule,
  ],
  providers: [RedicService],
})
export class AppModule {}
