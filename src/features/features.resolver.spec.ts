import { Test, TestingModule } from '@nestjs/testing';
import { FeaturesResolver } from './features.resolver';

describe('FeaturesResolver', () => {
  let resolver: FeaturesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeaturesResolver],
    }).compile();

    resolver = module.get<FeaturesResolver>(FeaturesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
