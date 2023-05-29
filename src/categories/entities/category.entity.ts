import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as schema, Document } from 'mongoose'

export type ICategory = Category & Document

@Schema({ timestamps: true, collection: 'categories' })
export class Category {
    @Prop({ required: true })
    title: string

    @Prop({ ref: 'users' })
    user_id: schema.Types.ObjectId

    @Prop({ defult: null, type: Date })
    deleted_at
}

export const CategorySchema = SchemaFactory.createForClass(Category)
