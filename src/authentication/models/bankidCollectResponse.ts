import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CollectStatus } from '../../bankid/interfaces/bankid.interfaces';

@ObjectType()
export class BankIDCollectResponse {
  @Field()
  status: CollectStatus;

  @Field({ nullable: true })
  hintCode: string;

  @Field((type) => Date)
  now: Date;
}
