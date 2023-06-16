import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: 'Nome obrigatorio'})
    name: string

    @IsNotEmpty({message: 'E-mail obrigatorio'})
    email: string

    @IsNotEmpty({message: 'Telefone obrigatorio'})
    phone: string

    @IsNotEmpty({message: 'Cpf obrigatorio'})
    cpf: string

    @IsNotEmpty({message: 'Senha obrigatorio'})
    password: string
}
