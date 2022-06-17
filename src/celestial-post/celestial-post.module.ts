import { Module } from '@nestjs/common';
import { CelestialPostService } from './celestial-post.service';
import { CelestialPostResolver } from './celestial-post.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CelestialPost } from './entities/celestial-post.entity';
import { PostCommentEntity } from 'src/post-comments/entities/post-comment.entity';
import { PostLikeEntity } from 'src/post-likes/entities/post-like.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([CelestialPost]),
    PostCommentEntity,
    PostLikeEntity,
  ],
  providers: [CelestialPostResolver, CelestialPostService],
  exports: [CelestialPostService],
})
export class CelestialPostModule {}
