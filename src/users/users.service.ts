import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import mongoose, { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
    constructor(@InjectModel('users') private readonly users: Model<User>) {}
    async create(createUserDto) {
        const user = await this.users.create({
            name: createUserDto?.name ?? '',
            email: createUserDto?.email ?? '',
            phone: createUserDto?.phone ?? '',
            cpf: createUserDto?.cpf ?? '',
        })
        console.log(createUserDto)
        if (!user) {
            return 'Erro ao criar o usuário!'
        }
        return user
    }

    async findAll() {
        return await this.users.find().exec()
    }

    async findOne(id: string) {
        return `This action returns a #${id} user`
    }

    async update(id: string, updateUserDto) {
        await this.users.findByIdAndUpdate(id, updateUserDto).exec()
    }

    async remove(id: string) {
        await this.users.findByIdAndRemove(id)
    }
}
