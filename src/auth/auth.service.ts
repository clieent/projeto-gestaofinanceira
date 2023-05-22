import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { compareSync } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private jwtService: JwtService
    ) {}

    // async login(user) {
    //     const user = await this.userService
    //     .findOneByEmail(email)
    //     const payload = { sub: user.id, email: user.email }

    //     return {
    //         token: this.jwtService.sign(payload),
    //     }
    // }

    async validateUser(email: string, password: string) {
        const user = (await this.userService.findOneByEmail(email)).toObject()
        if (!user) {
            return {
                status: 404,
                data: null,
            }
        }

        const isPasswordValid = compareSync(password, user.password)

        if (!isPasswordValid) {
            return {
                status: 500,
                data: 'Senha e/ou email invalido',
            }
        }
        delete user.password
        const payload = { sub: user.id, email: user.email }
        user.token = this.jwtService.sign(payload)

        return {
            status: 201,
            data: {
                user: user,
            },
        }
    }
}
