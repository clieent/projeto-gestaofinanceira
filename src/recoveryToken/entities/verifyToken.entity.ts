import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Date, Document, Schema as schema } from 'mongoose'

export type IVerifyToken = VerifyToken & Document

@Schema({ timestamps: true, collection: 'verifyToken' })
export class VerifyToken {

    @Prop({ required: false })
    user_id: string

    @Prop({ required: true })
    token: string

    @Prop({ default: false })
    changed: boolean

    @Prop({ default: null, type: Date })
    deleted_at
}

export const VerifyTokenSchema = SchemaFactory.createForClass(VerifyToken)
