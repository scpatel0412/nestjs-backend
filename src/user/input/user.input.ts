import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class userInput {
  @Field(() => String)
  email: string;
  @Field(() => String)
  username: string;
  @Field(() => String)
  firstname: string;
  @Field(() => String)
  lastname: string;
  @Field(() => String)
  password: string;
  @Field(() => Int)
  contact: number;
}
