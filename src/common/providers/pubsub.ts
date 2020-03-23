import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

export const PUB_SUB = 'PUB_SUB';

export const PubSubProvider = {
  provide: PUB_SUB,
  useValue: new PubSub(),
};
