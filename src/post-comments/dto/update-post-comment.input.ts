import { CreatePostCommentDto } from './create-post-comment.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePostCommentDto extends PartialType(CreatePostCommentDto) {
  @Field(() => String)
  id: string;
}
