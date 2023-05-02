import {Prop, SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type IUser = User & Document

export class User {
    @Prop({required: true})
    name: string

    @Prop({required: true})
    email: string

    @Prop({required: true})
    phone: string

    @Prop({required: true})
    cpf: string
}

export const UserSchema = SchemaFactory.createForClass(User)