import { Resolver, Mutation, ResolveProperty } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { AuctionService } from './auctions.service';
import { UserService } from 'src/users/users.service';
import { Auction } from './models/auction.model';
import { User } from '../users/models/user.model';

@Resolver(of => Auction)
export class AuctionsResolver {
  @Inject() auctionsService: AuctionService;
  @Inject() userService: UserService;

  @Mutation(returns => Auction)
  async createAuction() {}

  @ResolveProperty('seller', returns => User)
  async seller(obj): Promise<User> {
    return this.userService.findOne(obj.seller);
  }
}
