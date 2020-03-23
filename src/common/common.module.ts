import { Module } from '@nestjs/common';
import { DateScalar } from './scalars/date.scalar';
import { PubSubProvider } from './providers/pubsub';

@Module({
  providers: [DateScalar, PubSubProvider],
  exports: [DateScalar, PubSubProvider],
})
export class CommonModule {}
