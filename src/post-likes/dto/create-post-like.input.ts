import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostLikeDto {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  userName: string;

  @Field(() => Boolean)
  like: boolean;
}
