import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class BankIDAuth {
  @Field((type) => ID)
  autoStartToken: string;

  @Field()
  orderRef: string;
}
