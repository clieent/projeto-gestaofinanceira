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
            .populate('category_id', { title: true })
            .exec()
            .then((data) => {
                return {
                    status: HttpStatus.OK,
                    data,
                }
            })
            .catch((error) => {
                return {
                    status: HttpStatus.NOT_FOUND,
                    data: error,
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
        return this.cashFlows
            .findByIdAndDelete(id)
            .then((data) => {
                return {
                    status: HttpStatus.OK,
                    data,
                }
            })
            .catch((error) => {
                return {
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    data: error,
                }
            })
    }
}
