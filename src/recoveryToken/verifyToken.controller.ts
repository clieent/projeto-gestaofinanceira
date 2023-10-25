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
import { VerifyTokenService } from './verifyToken.service'
import { CreateVerifyTokenDto } from './dto/create-verifyToken.dto'
import { UpdateVerifyTokenDto } from './dto/update-verifyToken.dto'
import { Response } from 'express'

@Controller('verifyToken')
export class VerifyTokenController {
    constructor(private readonly verifyTokenService: VerifyTokenService) {}

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateVerifyTokenDto: UpdateVerifyTokenDto,
        @Res() res: Response
    ) {
        const { data, status } = await this.verifyTokenService.update(
            id,
            updateVerifyTokenDto
        )
        res.status(status).send(data).end()
    }

    @Get()
    async findOne(@Query('token') token: string, @Res() res: Response) {
        console.log(token, 'log token controller')

        const { data, status } = await this.verifyTokenService.findOne({
            token,
        })
        console.log(status)
        res.status(status).send(data)
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() res: Response) {
        const { status, data } = await this.verifyTokenService.remove(id)
        res.status(status).send(data).end()
    }
}
