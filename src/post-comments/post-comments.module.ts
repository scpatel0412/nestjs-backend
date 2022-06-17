import { Module } from '@nestjs/common';
import { PostCommentsService } from './post-comments.service';
import { PostCommentsResolver } from './post-comments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostCommentEntity } from './entities/post-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostCommentEntity])],
  providers: [PostCommentsResolver, PostCommentsService],
  exports: [PostCommentsService],
})
export class PostCommentsModule {}
