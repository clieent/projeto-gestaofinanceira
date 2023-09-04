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
        const { installment, dueDate, ...rest } = createCashFlowDto

        let cashFlows = []

        const intervalMonths = 1
        let day = parseInt(dueDate.split('/')[2])
        const month = parseInt(dueDate.split('/')[1])
        const year = parseInt(dueDate.split('/')[0])

        //if (installment) {
        for (let i = 0; i < installment; i++) {
            let changeMonth = new Date(`${day} ${month} ${year}`)
            changeMonth.setMonth(changeMonth.getMonth() + i * intervalMonths)

            /* if(day == 28) {
                const lastDay = new Date(year, month + 1, 0)
                day = lastDay.getDay()
            } */

            const installmentDto = {
                ...rest,
                value: parseFloat(createCashFlowDto.value) / installment,
                dueDate: `${changeMonth.getDate() < 9
                    ? '0' + (changeMonth.getDate())
                    :
                    changeMonth.getDate()}/${
                    changeMonth.getMonth() < 9
                        ? '0' + (changeMonth.getMonth() + 1)
                        : changeMonth.getMonth() + 1
                }/${changeMonth.getFullYear()}`,
            }

            cashFlows.push(installmentDto)
            console.log(changeMonth)
        }
        console.log(installment)
        //}
        //if(!installment) {
        const data = await this.cashFlows
            .insertMany(cashFlows)
            .then((cashFlows) => {
                if (cashFlows) {
                    return {
                        status: 200,
                        data: cashFlows,
                    }
                }
                return {
                    status: 400,
                    data: null,
                }
            })
            .catch((error) => {
                console.log(error)
                return {
                    status: 400,
                    data: null,
                }
            })
        return data
        //}
    }

    async findAll(user_id: string) {
        return await this.cashFlows
            .find({ user_id })
            .populate('category_id', { title: true })
            .populate('banks_id', { title: true })
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
            .updateMany(
                { _id: { $in: updateCashFlowDto } },
                { $set: { paid: true } }
            )
            .then((cashFlows) => {
                return {
                    data: cashFlows,
                    status: HttpStatus.OK,
                }
            })
            .catch((error) => {
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
function then(arg0: (cashFlow: any) => { status: HttpStatus; data: any }) {
    throw new Error('Function not implemented.')
}
