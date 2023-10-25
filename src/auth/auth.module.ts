import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from 'src/users/users.module'
import { ConfigModule } from '@nestjs/config'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { EmailService } from 'src/emails/emails.service'
import { EmailsModule } from 'src/emails/emails.module'
import { VerifyTokenModule } from 'src/recoveryToken/verifyToken.module'
import { VerifyTokenService } from 'src/recoveryToken/verifyToken.service'
import { ConfigService } from '@nestjs/config'
import * as dotenv from 'dotenv'
dotenv.config()


@Module({
    imports: [
        ConfigModule.forRoot(),
        PassportModule,
        UsersModule,
        VerifyTokenModule,
        EmailsModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '10h' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, EmailService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
