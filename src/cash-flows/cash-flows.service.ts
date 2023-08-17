import { Injectable } from '@nestjs/common'
import { CreateCashFlowDto } from './dto/create-cash-flow.dto'
import { UpdateCashFlowDto } from './dto/update-cash-flow.dto'
import { InjectModel } from '@nestjs/mongoose'
import { CashFlow, ICashFlow } from './entities/cash-flow.entity'
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

    findOne(id: any) {
        return `This action returns a #${id} cashFlow`
    }

    async update(updateCashFlowDto: UpdateCashFlowDto) {
        const cashFlows = await this.cashFlows
            .updateMany({_id: { $in: updateCashFlowDto}}, { $set: { paid: true }})
            .then((cashFlows) => {
                return {
                    data: cashFlows,
                    status: HttpStatus.OK,
                }
            }).catch((error) => {
                console.log(error)
                return {
                    status: HttpStatus.BAD_REQUEST,
                    data: null,
                }
            })
            return cashFlows
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
