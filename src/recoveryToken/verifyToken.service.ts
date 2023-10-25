import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateVerifyTokenDto } from './dto/create-verifyToken.dto'
import { UpdateVerifyTokenDto } from './dto/update-verifyToken.dto'
import { InjectModel } from '@nestjs/mongoose'
import { IVerifyToken } from './entities/verifyToken.entity'
import { Model } from 'mongoose'
import { JwtService } from '@nestjs/jwt'

interface ICreateProps {
    email?: string
    token: string
    user_id: string
    change?: boolean
}

@Injectable()
export class VerifyTokenService {
    constructor(
        @InjectModel('verifyToken')
        private readonly verifyToken: Model<IVerifyToken>,
        private jwtService: JwtService
    ) {}

    async create({ user_id, token }: ICreateProps) {
        const verifyToken = await this.verifyToken
            .create({ user_id, token })
            .then((verifyToken) => {
                return {
                    status: HttpStatus.CREATED,
                    data: verifyToken,
                }
            })
            .catch((error) => {
                console.log(error)
                return {
                    status: HttpStatus.BAD_GATEWAY,
                    data: error,
                }
            })
            return verifyToken
    }

    async tokenGenerate({ email }: {email: string}) {
        const payload = { email: email }
        const token = this.jwtService.sign(payload, {secret: process.env.JWT_SECRET})
        return token
    }
    
    async update(id: string, updateVerifyTokenDto: UpdateVerifyTokenDto) {
        const verifyToken = await this.verifyToken
            .findByIdAndUpdate(id, updateVerifyTokenDto)
            .then((data) => {
                return {
                    status: HttpStatus.CREATED,
                    data
                }
            })
            .catch((error) => {
                console.log(error)
                return {
                    data: null,
                    status: 400,
                }
            })
            return verifyToken
        }
        
        async findOne({ token }: { token: string }) {
            const verifyToken = await this.verifyToken
            .findOne({ token: token })
            .exec()
            .then((data) => {
                if(data) {
                    return {
                        status: 200,
                        data,
                    }
                }
                return {
                    status: 404,
                    data: null,
                }    
            })
            .catch((error) => {
                console.log(error)
                return {
                    status: 404,
                    data: null,
                }
            })
        return verifyToken
        }

        remove(id: string) {
            return this.verifyToken
            .findByIdAndRemove(id)
            .then((data) => {
                return {
                    status: HttpStatus.OK,
                    data,
                }
            })
            .catch((error) => {
                console.log(error)
                return {
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    data: error,
                }
            })
    }
}
