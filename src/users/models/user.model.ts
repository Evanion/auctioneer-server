import { Field, ID, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  pnr: string;

  @Field()
  email: string;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date, { nullable: true })
  updatedAt: Date;
}
