import { IsNotEmpty } from "class-validator";

export class CreateBanksDto {
    @IsNotEmpty({message: 'título obrigatório'})
    title: string

    @IsNotEmpty({message: 'id do usuario obrigatorio'})
    user_id: string
}