import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CelestialPost } from 'src/celestial-post/entities/celestial-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule, CelestialPost],
  providers: [UserResolver, UserService],
})
export class UserModule {}
