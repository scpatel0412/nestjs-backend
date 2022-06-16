import { ObjectType, Field } from '@nestjs/graphql';
import { CreateUserDto } from './create-user.input';

@ObjectType()
export class UserAuthModel {
  @Field()
  token: string;

  @Field((type) => CreateUserDto)
  user: CreateUserDto;
}
