import { CreatePostLikeDto } from './create-post-like.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePostLikeDto extends PartialType(CreatePostLikeDto) {
  @Field(() => String)
  id: string;
}
