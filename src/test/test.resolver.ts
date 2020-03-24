import { Resolver, Subscription, Query } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
const codename = require('codename')();
import { Codename } from './models/codename.model';

const pubSub = new PubSub();

@Resolver('Test')
export class TestResolver {
  @Query((returns) => Codename)
  test() {
    const result = {
      now: new Date(),
      text: codename
        .generate(['alliterative', 'random'], ['adjectives', 'animals'])
        .join(' '),
    };
    pubSub.publish('testSub', { testSub: result });
    return result;
  }

  @Subscription((returns) => Codename)
  testSub() {
    return pubSub.asyncIterator('testSub');
  }
}
