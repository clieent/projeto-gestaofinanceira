import { Module } from '@nestjs/common';
import { CashFlowsService } from './cash-flows.service';
import { CashFlowsController } from './cash-flows.controller';

@Module({
  controllers: [CashFlowsController],
  providers: [CashFlowsService]
})
export class CashFlowsModule {}
