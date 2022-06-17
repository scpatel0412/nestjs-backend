import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostCommentsService } from './post-comments.service';
import { PostCommentEntity } from './entities/post-comment.entity';
import { CreatePostCommentDto } from './dto/create-post-comment.input';
import { UpdatePostCommentDto } from './dto/update-post-comment.input';

@Resolver(() => PostCommentEntity)
export class PostCommentsResolver {
  constructor(private readonly postCommentsService: PostCommentsService) {}

  @Mutation((returns) => PostCommentEntity)
  async createComment(
    @Args('createCommentInput') createCommentInput: CreatePostCommentDto,
  ): Promise<PostCommentEntity> {
    return this.postCommentsService.createComment(createCommentInput);
  }

  @Mutation((returns) => PostCommentEntity)
  async updateComment(
    @Args('id') id: string,
    @Args('updateCommentInput') updateCommentInput: UpdatePostCommentDto,
  ): Promise<PostCommentEntity> {
    return this.postCommentsService.updateComment(id, updateCommentInput);
  }

  @Mutation((returns) => PostCommentEntity)
  async deleteComment(@Args('id') id: string): Promise<PostCommentEntity> {
    return this.postCommentsService.deleteComment(id);
  }

  @Query((returns) => [PostCommentEntity])
  async getComments(): Promise<Array<PostCommentEntity>> {
    return this.postCommentsService.getComments();
  }

  @Query((returns) => PostCommentEntity)
  async getComment(@Args('id') id: string): Promise<PostCommentEntity> {
    return this.postCommentsService.getComment(id);
  }
}
