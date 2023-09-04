import { Module } from '@nestjs/common'
import { BanksService } from './banks.service'
import { BanksController } from './banks.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { BanksSchema } from './entities/banks.entity'
import { UserSchema } from 'src/users/entities/user.entity'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'banks', schema: BanksSchema },
            { name: 'users', schema: UserSchema },
        ]),
    ],
    controllers: [BanksController],
    providers: [BanksService],
})
export class BanksModule {}
