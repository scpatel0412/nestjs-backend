import { ObjectType, Int, Field } from '@nestjs/graphql';

@ObjectType()
export class CreateUserDto {
  @Field(() => String)
  id: string;
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
