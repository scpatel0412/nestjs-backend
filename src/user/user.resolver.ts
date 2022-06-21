import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { userInput } from './input/user.input';
import { UserAuthModel } from './dto/user-auth.model';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized.decorator';

@Resolver((of) => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @AllowUnauthorized()
  @Mutation((returns) => CreateUserDto)
  createUser(@Args('createUserInput') createUserInput: userInput) {
    return this.userService.createUser(createUserInput);
  }

  @AllowUnauthorized()
  @Query((returns) => [UserEntity])
  getUsers() {
    return this.userService.getUsers();
  }

  @Query((returns) => UserEntity)
  getUser(@Args('id') id: string) {
    return this.userService.getUser(id);
  }

  @Mutation((returns) => CreateUserDto)
  updateUser(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.updateUser(id, updateUserInput);
  }

  @Mutation((returns) => CreateUserDto)
  deleteUser(@Args('id') id: string) {
    return this.userService.removeUser(id);
  }
  @AllowUnauthorized()
  @Mutation((returns) => UserAuthModel)
  userSignIn(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<UserAuthModel> {
    return this.userService.userSignIn(email, password);
  }
}
