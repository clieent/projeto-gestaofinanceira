import { Injectable } from '@nestjs/common'
import { CreateCashFlowDto } from './dto/create-cash-flow.dto'
import { UpdateCashFlowDto } from './dto/update-cash-flow.dto'
import { InjectModel } from '@nestjs/mongoose'
import { ICashFlow } from './entities/cash-flow.entity'
import { Model } from 'mongoose'
import { HttpStatus } from '@nestjs/common'

@Injectable()
export class CashFlowsService {
    constructor(
        @InjectModel('cashFlows') private readonly cashFlows: Model<ICashFlow>
    ) {}
    async create(createCashFlowDto: CreateCashFlowDto) {
        const cashFlow = await this.cashFlows
            .create(createCashFlowDto)
            .then((cashFlow) => {
                return {
                    status: HttpStatus.CREATED,
                    data: cashFlow,
                }
            })
            .catch(() => {
                return {
                    status: HttpStatus.BAD_GATEWAY,
                    data: null,
                }
            })
        return cashFlow
    }

    async findAll(user_id: string) {
        return await this.cashFlows
            .find({ user_id })
            .exec()
            .then((data) => {
                return {
                    status: 200,
                    data,
                }
            })
            .catch((error) => {
                console.log(error)
                return {
                    status: 404,
                    data: null,
                }
            })
    }

    findOne(id: number) {
        return `This action returns a #${id} cashFlow`
    }

    update(id: number, updateCashFlowDto: UpdateCashFlowDto) {
        return `This action updates a #${id} cashFlow`
    }

    remove(id: string) {
        return this.cashFlows.findByIdAndDelete(id)
    }
}
