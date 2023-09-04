import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as schema, Document } from 'mongoose'

export type IBanks = Banks & Document

@Schema({ timestamps: true, collection: 'banks' })
export class Banks {
    @Prop({ required: true })
    title: string

    @Prop({ ref: 'users' })
    user_id: schema.Types.ObjectId

    @Prop({ default: null, type: Date })
    deleted_at
}

export const BanksSchema = SchemaFactory.createForClass(Banks)
