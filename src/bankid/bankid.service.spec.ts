import { Test, TestingModule } from '@nestjs/testing';
import { BankIDService } from './bankid.service';

describe('BankidService', () => {
  let service: BankIDService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankIDService],
    }).compile();

    service = module.get<BankIDService>(BankIDService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
