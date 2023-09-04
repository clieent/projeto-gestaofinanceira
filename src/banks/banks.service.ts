import { Injectable } from '@nestjs/common'
import { CreateBanksDto } from './dto/create-banks.dto'
import { UpdateBanksDto } from './dto/update-banks.dto'
import { InjectModel } from '@nestjs/mongoose'
import { IBanks } from './entities/banks.entity'
import { Model } from 'mongoose'
import { HttpStatus } from '@nestjs/common'

@Injectable()
export class BanksService {
    constructor(@InjectModel('banks') private readonly banks: Model<IBanks>) {}
    async create(createBanksDto: CreateBanksDto) {
        const banks = await this.banks
            .create(createBanksDto)
            .then((banks) => {
                return {
                    status: HttpStatus.CREATED,
                    data: banks,
                }
            })
            .catch((error) => {
                console.log(error)
                return {
                    status: HttpStatus.BAD_GATEWAY,
                    data: error,
                }
            })
        if (!banks) {
            console.log('Erro ao criar categoria')
        }
        return banks
    }

    async findAll(user_id: string) {
        return await this.banks
            .find({ user_id })
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
        return `This action returns a #${id} banks`
    }

    async update(id: string, updateBanksDto: UpdateBanksDto) {
        const banks = await this.banks
            .findByIdAndUpdate(id, updateBanksDto, { new: true })
            .then((banks) => {
                return {
                    data: banks,
                    status: HttpStatus.OK,
                }
            })
            .catch((error) => {
                console.log(error)
                return {
                    data: null,
                    status: HttpStatus.BAD_REQUEST,
                }
            })
        return banks
    }

    remove(id: string) {
        return this.banks
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
