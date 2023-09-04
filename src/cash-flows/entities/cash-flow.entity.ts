import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Date, Document, Schema as schema } from 'mongoose'

export type ICashFlow = CashFlow & Document

@Schema({ timestamps: true, collection: 'cashFlows' })
export class CashFlow {
    @Prop({ required: true })
    title: string

    @Prop({ required: false })
    description: string

    @Prop({ required: true })
    value: string
    
    @Prop({ default: true })
    installment: number

    @Prop({ required: true })
    dueDate: string

    @Prop({ required: true })
    type: boolean

    @Prop({ default: false })
    paid: boolean

    @Prop({ required: true, ref: 'users' })
    user_id: schema.Types.ObjectId

    @Prop({ required: true, ref: 'categories' })
    category_id: schema.Types.ObjectId

    @Prop({ required: true, ref: 'banks' })
    banks_id: schema.Types.ObjectId

    @Prop({ default: null, type: Date })
    deleted_at
}

export const CashFlowSchema = SchemaFactory.createForClass(CashFlow)
