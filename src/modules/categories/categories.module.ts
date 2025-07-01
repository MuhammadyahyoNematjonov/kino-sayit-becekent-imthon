import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from 'src/core/models/categories.model';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[SequelizeModule.forFeature([Category]),AuthModule],
  controllers: [CategoriesController],
  providers: [CategoriesService,AuthGuard],
})
export class CategoriesModule {}
