import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { compareSync } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { EmailService } from 'src/emails/emails.service'
import { VerifyTokenService } from 'src/recoveryToken/verifyToken.service'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private jwtService: JwtService,
        private readonly emailService: EmailService,
        private readonly verifyTokenService: VerifyTokenService
    ) {}

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

    async resetPassword({ email }: { email: string }) {
        const verifyEmail = await this.userService
            .findOneByEmail(email)
            .then((data) => {
                if (data) {
                    return {
                        email: data.email,
                        valid: true,
                        id: data._id,
                    }
                }
                return { id: '', email: null, valid: false }
            })
            .catch((err) => {
                console.log(err)
                return { valid: false, email: null, id: '' }
            })
        if (verifyEmail.valid) {
            const saveToken = await this.verifyTokenService.tokenGenerate({
                email,
            })

            this.verifyTokenService.create({
                user_id: verifyEmail.id,
                token: saveToken,
            })

            const sendMessageToEmail =
                await this.emailService.sendResetPassword(
                    verifyEmail.email,
                    '',
                    saveToken
                )
            return {
                status: 200,
                data: {
                    success: true,
                    emailResponse: sendMessageToEmail,
                },
            }
        }
        return {
            status: 500,
            data: {
                success: false,
            },
        }
    }

    async newPassword({
        email,
        password,
    }: {
        email: string
        password: string
    }) {
        const createNewPassword = await this.userService
            .updatePassword(email, { password })
            .then((data) => {
                return {
                    status: 200,
                    data,
                }
            })
            .catch((error) => {
                console.log(error)
                return {
                    status: 500,
                    data: null,
                }
            })
        return createNewPassword
    }
}
