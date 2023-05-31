import { Injectable } from '@nestjs/common';
import { CreateCashFlowDto } from './dto/create-cash-flow.dto';
import { UpdateCashFlowDto } from './dto/update-cash-flow.dto';

@Injectable()
export class CashFlowsService {
  create(createCashFlowDto: CreateCashFlowDto) {
    return 'This action adds a new cashFlow';
  }

  findAll() {
    return `This action returns all cashFlows`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cashFlow`;
  }

  update(id: number, updateCashFlowDto: UpdateCashFlowDto) {
    return `This action updates a #${id} cashFlow`;
  }

  remove(id: number) {
    return `This action removes a #${id} cashFlow`;
  }
}
