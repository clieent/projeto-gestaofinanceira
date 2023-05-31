import { Test, TestingModule } from '@nestjs/testing';
import { CashFlowsController } from './cash-flows.controller';
import { CashFlowsService } from './cash-flows.service';

describe('CashFlowsController', () => {
  let controller: CashFlowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashFlowsController],
      providers: [CashFlowsService],
    }).compile();

    controller = module.get<CashFlowsController>(CashFlowsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
