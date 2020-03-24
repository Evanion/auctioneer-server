import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Codename {
  @Field((type) => Date)
  now: Date;

  @Field()
  text: string;
}
