import { Test, TestingModule } from '@nestjs/testing';
import { CashFlowsService } from './cash-flows.service';

describe('CashFlowsService', () => {
  let service: CashFlowsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CashFlowsService],
    }).compile();

    service = module.get<CashFlowsService>(CashFlowsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
