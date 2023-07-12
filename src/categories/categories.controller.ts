import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    Res,
} from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Response } from 'express'

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    async create(
        @Body() createCategoryDto: CreateCategoryDto,
        @Res() res: Response
    ) {
        const { status, data } = await this.categoriesService.create(
            createCategoryDto
        )
        res.status(status).send(data).end()
    }

    @Get()
    async findAll(@Query('userId') userId: string, @Res() res: Response) {
        const { status, data } = await this.categoriesService.findAll(userId)
        res.status(status).send(data).end()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoriesService.findOne(+id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto
    ) {
        return this.categoriesService.update(id, updateCategoryDto)
    }

    @Delete(':id')
   async remove(@Param('id') id: string, @Res() res: Response) {
        const {status, data} = await this.categoriesService.remove(id)
        res.status(status).send(data).end()
    }
}
