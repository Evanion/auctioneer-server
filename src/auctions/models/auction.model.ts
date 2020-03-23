import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';

@ObjectType()
export class Auction {
  @Field((type) => ID)
  id: string;

  @Field((type) => User)
  seller: User;
}
