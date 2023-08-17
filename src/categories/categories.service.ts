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

    findOne(id: string) {
        return `This action returns a #${id} category`
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto) {
        console.log(updateCategoryDto)
        const category = await this.categories.findByIdAndUpdate(id, updateCategoryDto, {new: true}).then((category) => {
            return {
                data: category,
                status: HttpStatus.CREATED
            }
        }).catch((error) => {
            console.log(error)
            return {
                data: null,
                status: HttpStatus.BAD_REQUEST
            }
        })
        return category
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
