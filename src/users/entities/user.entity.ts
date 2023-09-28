import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Date, Document } from 'mongoose'

export type IUsers = User & Document

@Schema({ timestamps: true, collection: 'users' })
export class User {
    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    email: string

    @Prop({ required: true })
    phone: string

    @Prop({ required: true })
    cpf: string

    @Prop({ required: true })
    password: string

    token: string

    @Prop({default: null })
    image: string

    @Prop({ default: null, type: Date })
    deleted_at
}

export const UserSchema = SchemaFactory.createForClass(User)
