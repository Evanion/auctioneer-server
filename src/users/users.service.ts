import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interfaces/user.interface';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

const HASH_ROUNDS = 12;

@Injectable()
export class UserService {
  @InjectModel('User') private userModel: Model<IUser>;

  /**
   * allows you to create a new user in the database
   * @param user The data that should be used to create a new user
   */
  async create(user: CreateUserInput): Promise<IUser> {
    const found = await this.findByEmailOrUsername(user.email, user.username);

    if (found) throw new GraphQLError('RESOURCE_EXISTS');

    const newUser = {
      ...user,
      password: await hash(user.password, HASH_ROUNDS),
      createdAt: new Date(),
    };
    const createdUser = new this.userModel(newUser);
    return createdUser.save();
  }

  async update(user: UpdateUserInput) {
    const newUser = {
      ...user,
      updatedAt: new Date(),
      password: user.password
        ? await hash(user.password, HASH_ROUNDS)
        : undefined,
    };
    const createdUser = new this.userModel(newUser);
    return createdUser.save();
  }

  findAll(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }

  findOne(id: string): Promise<IUser> {
    return this.userModel.findById(id).exec();
  }

  findByEmail(email: string): Promise<IUser> {
    return this.userModel
      .findOne({
        where: { email: { $eq: email } },
      })
      .exec();
  }

  findByEmailOrUsername(email: string, username: string): Promise<IUser> {
    return this.userModel
      .findOne({
        $or: [{ email: { $eq: email } }, { username: { $eq: username } }],
      })
      .exec();
  }
}
