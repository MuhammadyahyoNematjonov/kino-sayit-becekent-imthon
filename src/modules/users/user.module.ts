import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/core/models/user.model';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jwt_secret_key',
      signOptions: { expiresIn: '7d' },
    }),
    
    SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService,AuthGuard]
})
export class UserModule {}
