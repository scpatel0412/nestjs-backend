import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { userInput } from './input/user.input';
import { UserEntity } from './user.entity';
import { AuthService } from 'src/auth/auth.service';
import * as crypto from 'crypto';
import { UserAuthModel } from './dto/user-auth.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  async createUser(data: userInput): Promise<UserEntity> {
    const user = new UserEntity();
    const password = this.hashPassword(data.password);
    const email = this.normalizeEmail(data.email);
    user.email = email;
    user.firstname = data.firstname;
    user.lastname = data.lastname;
    user.username = data.username;
    user.password = password;
    user.contact = data.contact;

    await this.UserRepository.save(user);

    return user;
  }
  async getUsers(): Promise<Array<UserEntity>> {
    return await this.UserRepository.find({ relations: ['celestialPosts'] });
  }
  async getUser(id: string): Promise<UserEntity> {
    return await this.UserRepository.findOne({
      where: { id },
      relations: ['celestialPosts'],
    });
  }
  async updateUser(
    id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<CreateUserDto> {
    const user = await this.UserRepository.preload({
      id: id,
      ...updateUserInput,
    });
    const password = this.hashPassword(updateUserInput.password);
    const email = this.normalizeEmail(updateUserInput.email);
    user.email = email;
    user.firstname = updateUserInput.firstname;
    user.lastname = updateUserInput.lastname;
    user.password = password;
    user.username = updateUserInput.username;
    user.contact = updateUserInput.contact;
    if (!user) {
      throw new NotFoundException(`User with ${id} not found`);
    }
    return this.UserRepository.save(user);
  }
  async removeUser(id: string) {
    const user = await this.UserRepository.findOne({ where: { id } });
    if (user) {
      await this.UserRepository.remove(user);
      return {
        id: id,
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        username: '',
        contact: 0,
      };
    } else {
      throw new NotFoundException(`User with ${id} not found`);
    }
  }
  async userSignIn(email: string, password: string): Promise<UserAuthModel> {
    const user = await this.getUserForSignIn({
      email: this.normalizeEmail(email),
      password: this.hashPassword(password),
    });
    if (!user) {
      throw new UnauthorizedException(`${email} not found please sign up`);
    }
    const authtoken = await this.authService.createAccessToken({
      sub: user.id,
      email: email,
    });
    const token = authtoken || ' ';
    return { user, token };
  }

  public normalizeEmail(email) {
    return email.trim().toLowerCase();
  }
  public async getUserForSignIn(params) {
    return this.UserRepository.findOne({ where: params });
  }
  private hashPassword(pwd: string): string {
    return crypto.createHash('sha256').update(`${pwd}`).digest('base64');
  }
}
