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
import { CashFlowsService } from './cash-flows.service'
import { CreateCashFlowDto } from './dto/create-cash-flow.dto'
import { UpdateCashFlowDto } from './dto/update-cash-flow.dto'
import { Response } from 'express'

@Controller('cash-flows')
export class CashFlowsController {
    constructor(private readonly cashFlowsService: CashFlowsService) {}

    @Post()
    create(@Body() createCashFlowDto: CreateCashFlowDto) {
        return this.cashFlowsService.create(createCashFlowDto)
    }

    @Get(':userId')
    async findAll(@Param('userId') userId: string, @Res() res: Response) {
        const { status, data } = await this.cashFlowsService.findAll(userId)
        res.status(status).send(data).end()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.cashFlowsService.findOne(+id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCashFlowDto: UpdateCashFlowDto
    ) {
        return this.cashFlowsService.update(+id, updateCashFlowDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.cashFlowsService.remove(id)
    }
}
