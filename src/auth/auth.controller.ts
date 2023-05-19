import { Controller, Post, Body, UseGuards, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(
        @Body() req: { email: string; password: string },
        @Res() res: Response
    ) {
        const { status, data } = await this.authService.validateUser(
            req.email,
            req.password
        )
        res.status(status).send(data)
    }
}
