import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './users.service';
import { CreateUserInput } from './dto/createUser.input';
import { User } from './models/user.model';
import { UpdateUserInput } from './dto/updateUser.input';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(returns => User)
  async createUser(@Args('user') user: CreateUserInput) {
    return await this.userService.create(user);
  }

  @Mutation(returns => User)
  async updateUser(@Args('user') user: UpdateUserInput) {
    const result = await this.userService.update(user);
    return result;
  }

  @Query(returns => [User], { name: 'users' })
  async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(returns => User, { name: 'user' })
  async getUser(@Args('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }
}
