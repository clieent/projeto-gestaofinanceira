import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { InjectModel } from '@nestjs/mongoose'
import { ICategory } from './entities/category.entity'
import { Model } from 'mongoose'

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel('categories') private readonly categories: Model<ICategory>
    ) {}
    async create(createCategoryDto: CreateCategoryDto) {
        const category = await this.categories.create(createCategoryDto).then((categories) => {
            return {
                status: HttpStatus.CREATED,
                data:categories
            }
        }).catch((error)=>{
            return{
                status: HttpStatus.BAD_GATEWAY,
                data: error,
            }
        })
        if (!category) {
            console.log('Erro ao cirar categoria')
        }
        return category
    }

    async findAll(user_id: string) {
        return await this.categories.find({ user_id }).exec().then((data)=>{
            return {
                status: HttpStatus.OK,
                data,
            }
        }).catch((error)=>{
            return{
                status: HttpStatus.NOT_FOUND,
                data: error,
            }
        })
    }

    findOne(id: number) {
        return `This action returns a #${id} category`
    }

    update(id: number, updateCategoryDto: UpdateCategoryDto) {
        return `This action updates a #${id} category`
    }

    remove(id: string) {
        return this.categories.findByIdAndRemove(id).then((data)=>{
            return {
                status: HttpStatus.OK,
                data,
            }
        }).catch((error)=> {
            return {
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                data: error,
            }
        })
    }
}
