import { Module } from '@nestjs/common'
import { VerifyTokenService } from './verifyToken.service'
import { VerifyTokenController } from './verifyToken.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { VerifyTokenSchema } from './entities/verifyToken.entity'
import { JwtService } from '@nestjs/jwt'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'verifyToken', schema: VerifyTokenSchema },
        ]),
    ],
    controllers: [VerifyTokenController],
    providers: [VerifyTokenService, JwtService],
    exports: [VerifyTokenService]
})
export class VerifyTokenModule {}
