import { Module, HttpModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { BankIDService } from './bankid/bankid.service';
import { BankIDModule } from './bankid/bankid.module';
import { CommonModule } from './common/common.module';
import { AuctionsModule } from './auctions/auctions.module';
import { FeaturesModule } from './features/features.module';
import { countryResolver } from './utils/resolvers/country';
import { marketResolver } from './utils/resolvers/market';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot('mongodb://localhost/auctioneer', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context({ req, ...rest }) {
        // return if request is a Subscription
        if (!req?.headers) return;

        // It's a Query or Mutation, continue as usual.
        const ip = req.connection.remoteAddress.split(`:`).pop();
        const country = countryResolver(req);
        const market = marketResolver(req, country);

        return {
          ip: ip === '1' ? '192.169.0.1' : ip,
          country,
          market,
          req,
          ...rest,
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
    }),
    CommonModule,
    BankIDModule,
    UsersModule,
    AuthenticationModule,
    AuctionsModule,
    FeaturesModule,
  ],
  controllers: [AppController],
  providers: [AppService, BankIDService],
})
export class AppModule {}
