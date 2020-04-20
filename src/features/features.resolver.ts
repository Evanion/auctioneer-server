import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Resolver('Features')
export class FeaturesResolver {
  @Inject('FEATURES_SERVICE')
  private client: ClientProxy;

  @Query((returns) => [String])
  async features(@Context() { market, country }): Promise<string[]> {
    console.log({ market, country });
    return this.client
      .send({ cmd: 'features.all' }, { market, country })
      .toPromise();
  }
  @Query((returns) => Boolean)
  async feature(
    @Args('feature') feature: string,
    @Context() { market, country },
  ): Promise<boolean> {
    console.log({ market, country });
    return this.client
      .send({ cmd: 'features.isActive' }, { feature, market, country })
      .toPromise();
  }
}
