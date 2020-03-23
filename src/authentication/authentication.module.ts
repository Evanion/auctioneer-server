import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthenticationResolver } from './authentication.resolver';
import { AuthenticationService } from './authentication.service';
import { BankIDModule } from 'src/bankid/bankid.module';
import { CommonModule } from 'src/common/common.module';
import { UsersModule } from 'src/users/users.module';
import { BankIDCollectHandler } from './commands/handlers/BankIDCollect.handler';

export const CommandHandlers = [BankIDCollectHandler];

@Module({
  providers: [
    AuthenticationResolver,
    AuthenticationService,
    ...CommandHandlers,
  ],
  imports: [BankIDModule, UsersModule, CqrsModule, CommonModule],
})
export class AuthenticationModule {}
