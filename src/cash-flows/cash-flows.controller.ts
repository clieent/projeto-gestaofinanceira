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

@Controller('cashFlows')
export class CashFlowsController {
    constructor(private readonly cashFlowsService: CashFlowsService) {}

    @Post()
    async create(
        @Body() createCashFlowDto: CreateCashFlowDto,
        @Res() res: Response
    ) {
        const { status, data } = await this.cashFlowsService.create(
            createCashFlowDto
        )
        res.status(status).send(data).end()
    }

    @Get(':userId/users')
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
        return this.cashFlowsService.update(updateCashFlowDto)
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() res: Response) {
        const { status, data } = await this.cashFlowsService.remove(id)
        res.status(status).send(data).end()
    }
}
