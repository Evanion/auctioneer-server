import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PubSub } from 'graphql-subscriptions';
import { AxiosResponse } from 'axios';
import { BankIDCollectCommand } from '../impl/BankidCollect.command';
import { Inject } from '@nestjs/common';
import { delay, repeatWhen, takeWhile } from 'rxjs/operators';
import { BankIDService } from '../../../bankid/bankid.service';
import {
  BankIDCollectResponse,
  CollectStatus,
} from '../../../bankid/interfaces/bankid.interfaces';
import { PUB_SUB } from '../../../common/providers/pubsub';

@CommandHandler(BankIDCollectCommand)
export class BankIDCollectHandler
  implements ICommandHandler<BankIDCollectCommand> {
  @Inject() private readonly bankidService: BankIDService;
  @Inject(PUB_SUB) private readonly pubSub: PubSub;

  async execute(command: BankIDCollectCommand) {
    // @ts-ignore
    const { orderRef } = command;
    console.log('BankIDCollectCommand', command);
    this.bankidService
      .collect(orderRef)
      .pipe(
        repeatWhen(notifier => notifier.pipe(delay(2000))),
        takeWhile(({ data }: AxiosResponse<BankIDCollectResponse>) => {
          console.log('result', data);
          return data.status === CollectStatus.pending;
        }),
      )
      .subscribe(({ data }: AxiosResponse<BankIDCollectResponse>) => {
        return this.pubSub.publish('bankidCollect', data);
      });
  }
}
