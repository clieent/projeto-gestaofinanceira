import { IsNotEmpty, IsOptional } from 'class-validator'
import { Schema as schema } from 'mongoose'

export class CreateCashFlowDto {
    @IsNotEmpty({ message: 'titulo obrigatório' })
    title: string

    @IsOptional()
    description?: string

    @IsNotEmpty({ message: 'valor obrigatório' })
    value: string

    @IsNotEmpty({ message: 'data obrigatório' })
    dueDate: string

    @IsNotEmpty({ message: 'tipo obrigatório' })
    type: boolean

    @IsNotEmpty({ message: 'id do usuario obrigatório' })
    user_id: schema.Types.ObjectId

    @IsNotEmpty({ message: 'id da categoria obrigatório' })
    category_id: schema.Types.ObjectId

    @IsNotEmpty({ message: 'id do banco obrigatório' })
    banks_id: schema.Types.ObjectId

    @IsNotEmpty({ message: 'quantidade de parcelas obrigatório'})
    installment: number | null
}
