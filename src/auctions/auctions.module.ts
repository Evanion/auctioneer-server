import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuctionsResolver } from './auctions.resolver';
import { AuctionService } from './auctions.service';
import { AuctionSchema } from './schemas/auction.schema';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [AuctionsResolver, AuctionService],
  imports: [
    MongooseModule.forFeature([{ name: 'Auction', schema: AuctionSchema }]),
    UsersModule,
  ],
})
export class AuctionsModule {}
