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
                const catPop = await category.populate('users')
                return {
                    category,
                    catPop,
                }
            })
            .catch(() => {
                return null
            })
    }

    async findAll() {
        return await this.categories.find().populate('user_id').exec()
    }

    findOne(id: number) {
        return `This action returns a #${id} category`
    }

    update(id: number, updateCategoryDto: UpdateCategoryDto) {
        return `This action updates a #${id} category`
    }

    remove(id: number) {
        return `This action removes a #${id} category`
    }
}
