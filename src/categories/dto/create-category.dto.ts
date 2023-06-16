import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty({message: 'titulo obrigatorio'})
    title: string

    @IsNotEmpty({message: 'id do usuario obrigatorio'})
    user_id: string
}
