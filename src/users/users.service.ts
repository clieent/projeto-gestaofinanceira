import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel("users") private readonly users: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.users.create(createUserDto)
    console.log(createUserDto)
    if(!user) {
      return 'Erro ao criar o usuário!'
    }
    return user
  }

  async findAll() {
    return await this.users.find().exec()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
