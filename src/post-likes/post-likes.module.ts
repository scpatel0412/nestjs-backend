import { Module } from '@nestjs/common';
import { PostLikesService } from './post-likes.service';
import { PostLikesResolver } from './post-likes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostLikeEntity } from './entities/post-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostLikeEntity])],
  providers: [PostLikesResolver, PostLikesService],
  exports: [PostLikesService],
})
export class PostLikesModule {}
