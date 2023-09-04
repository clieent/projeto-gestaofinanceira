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
import { BanksService } from './banks.service'
import { CreateBanksDto } from './dto/create-banks.dto'
import { UpdateBanksDto } from './dto/update-banks.dto'
import { Response } from 'express'

@Controller('banks')
export class BanksController {
    constructor(private readonly banksService: BanksService) {}

    @Post()
    async create(
        @Body() createBanksDto: CreateBanksDto,
        @Res() res: Response
    ) {
        const { status, data } = await this.banksService.create(
            createBanksDto
        )
        res.status(status).send(data).end()
    }

    @Get()
    async findAll(@Query('userId') userId: string, @Res() res: Response) {
        const { status, data } = await this.banksService.findAll(userId)
        res.status(status).send(data).end()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.banksService.findOne(id)
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateBanksDto: UpdateBanksDto,
        @Res() res: Response
    ) {
        const {data, status} = await this.banksService.update(id, updateBanksDto)
        res.status(status).send(data).end()
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() res: Response) {
        const { status, data } = await this.banksService.remove(id)
        res.status(status).send(data).end()
    }
}
