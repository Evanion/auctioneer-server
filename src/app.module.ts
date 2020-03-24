import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { UsersModule } from './users/users.module';
//import { AuthenticationModule } from './authentication/authentication.module';
//import { BankIDService } from './bankid/bankid.service';
//import { BankIDModule } from './bankid/bankid.module';
import { CommonModule } from './common/common.module';
// import { AuctionsModule } from './auctions/auctions.module';
//import { MongooseModule } from '@nestjs/mongoose';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    //HttpModule,
    /*MongooseModule.forRoot('mongodb://localhost/auctioneer', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),*/
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context({ req }) {
        const ip = req.connection.remoteAddress.split(`:`).pop();

        return {
          ip: ip === '1' ? '192.169.0.1' : ip,
        };
      },
      formatError(err) {
        return {
          ...err,
          message: err.message,
          // @ts-ignore
          code: err.originalError?.code,
        };
      },
      installSubscriptionHandlers: true,
      subscriptions: {
        path: 'subscriptions',
      },
    }),
    CommonModule,
    //BankIDModule,
    //UsersModule,
    //AuthenticationModule,
    TestModule,
    //AuctionsModule,
  ],
  controllers: [AppController],
  providers: [AppService /*BankIDService*/],
})
export class AppModule {}
