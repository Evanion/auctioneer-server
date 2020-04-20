import { Module } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { FeaturesResolver } from './features.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'FEATURES_SERVICE', transport: Transport.TCP },
    ]),
  ],
  providers: [FeaturesService, FeaturesResolver],
})
export class FeaturesModule {}
