import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostCommentDto {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  userName: string;

  @Field(() => String)
  comment: string;

  @Field(() => String)
  postsId: string;
}
