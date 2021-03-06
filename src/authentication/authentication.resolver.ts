import {
  Args,
  Context,
  Mutation,
  Resolver,
  Subscription,
  Query,
} from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { BankIDAuth } from './models/bankidAuth';
import { BankIDAuthInput } from './dto/bankidAuth.input';
import { Inject } from '@nestjs/common';
import { PubSub } from 'apollo-server-express';
import { PUB_SUB } from '../common/providers/pubsub';
import { BankIDCollectResponse } from './models/bankidCollectResponse';
import { AuthenticationService } from './authentication.service';
import { BankIDCollectCommand } from './commands/impl/BankidCollect.command';

@Resolver('Authentication')
export class AuthenticationResolver {
  @Inject() private readonly commandBus: CommandBus;
  @Inject() private readonly authService: AuthenticationService;
  @Inject(PUB_SUB) private readonly pubSub: PubSub;

  @Query((returns) => BankIDAuth)
  async bankidAuth(
    @Args('payload') payload: BankIDAuthInput,
    @Context() ctx: { ip: string },
  ) {
    const result = await this.authService.bankidAuth(payload, ctx.ip);
    console.log('sending CQRS command', result);
    this.commandBus.execute(new BankIDCollectCommand(result.orderRef));
    return result;
  }

  @Subscription((returns) => BankIDCollectResponse, {
    filter: (payload, variables) => {
      return payload.bankidCollect.orderRef === variables.orderRef;
    },
  })
  bankidCollect(
    @Args({ name: 'orderRef', type: () => String }) orderRef: string,
  ) {
    return this.pubSub.asyncIterator('bankidCollect');
  }
}
