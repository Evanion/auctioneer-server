import { InputType, Field, ID } from '@nestjs/graphql';
import { ObjectID } from 'typeorm';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field((type) => ID)
  id: ObjectID;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @MinLength(8)
  password: string;
}
