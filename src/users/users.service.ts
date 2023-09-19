import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import mongoose, { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './entities/user.entity'
import { hash } from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(@InjectModel('users') private readonly users: Model<User>) {}
    async create(createUserDto) {
        const passwordCrypto = await hash(createUserDto.password, 8)
        const user = await this.users.create({
            name: createUserDto?.name ?? '',
            email: createUserDto?.email ?? '',
            phone: createUserDto?.phone ?? '',
            cpf: createUserDto?.cpf ?? '',
            password: passwordCrypto ?? '',
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
        const user = await this.users.findById(id).then((user) => {
            return {
                status: 200,
                data: {user}
            }
        })
        .catch((error) => {
            console.log(error)
            return {
                status: 404,
                data: null,
            }
        })
        return user
    }

    async findOneByEmail(email: string) {
        const user = await this.users
            .findOne({ email })
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
        return user.data
    }

    async update(id: string, updateUserDto) {
        const user = await this.users.findByIdAndUpdate(id, updateUserDto).then((user) => {
            return {
                status: 200,
                data: {user}
            }
        })
        .catch((error) => {
            console.log(error)
            return {
                status: 404,
                data: null,
            }
        })
        console.log(user)
        return user
    }

    async remove(id: string) {
        await this.users.findByIdAndRemove(id)
    }
}
