import { Module } from '@nestjs/common'
import { CashFlowsService } from './cash-flows.service'
import { CashFlowsController } from './cash-flows.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { CashFlowSchema } from './entities/cash-flow.entity'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'cashFlows', schema: CashFlowSchema },
        ]),
    ],
    controllers: [CashFlowsController],
    providers: [CashFlowsService],
})
export class CashFlowsModule {}
