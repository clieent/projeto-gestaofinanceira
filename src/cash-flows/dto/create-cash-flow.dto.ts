import { IsNotEmpty, IsOptional } from 'class-validator'
import { Schema as schema } from 'mongoose'

export class CreateCashFlowDto {
    @IsNotEmpty({ message: 'titulo obrigatorio' })
    title: string

    @IsOptional()
    description?: string

    @IsNotEmpty({ message: 'valor obrigatorio' })
    value: number

    @IsNotEmpty({ message: 'data obrigatorio' })
    dueDate: Date

    @IsNotEmpty({ message: 'tipo obrigatorio' })
    type: boolean

    @IsNotEmpty({ message: 'id do usuario obrigatorio' })
    user_id: schema.Types.ObjectId

    @IsNotEmpty({ message: 'id da categoria obrigatorio' })
    category_id: schema.Types.ObjectId
}
