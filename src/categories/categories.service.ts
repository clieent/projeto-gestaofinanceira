import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Category, ICategory } from './entities/category.entity'
import { Model } from 'mongoose'

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel('categories') private readonly categories: Model<ICategory>
    ) {}
    async create(createCategoryDto: CreateCategoryDto) {
        return this.categories
            .create(createCategoryDto)
            .then(async (category) => {
                return {
                    status: 201,
                    data: {
                        categories: category,
                    },
                }
            })
            .catch(() => {
                return null
            })
    }

    async findAll(user_id: string) {
        console.log(user_id)
        return await this.categories.find({ user_id }).exec()
    }

    findOne(id: number) {
        return `This action returns a #${id} category`
    }

    update(id: number, updateCategoryDto: UpdateCategoryDto) {
        return `This action updates a #${id} category`
    }

    remove(id: string) {
        return this.categories.findByIdAndRemove(id)
    }
}
