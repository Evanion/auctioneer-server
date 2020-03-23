import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CollectStatus } from 'src/bankid/interfaces/bankid.interfaces';

@ObjectType()
export class BankIDCollectStatus {
  @Field((type) => CollectStatus)
  status: CollectStatus;
}
