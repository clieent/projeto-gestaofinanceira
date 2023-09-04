import { PartialType } from '@nestjs/mapped-types';
import { CreateBanksDto } from './create-banks.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateBanksDto extends PartialType(CreateBanksDto) {
    @IsNotEmpty({message: 'id do usuario obrigatorio'})
    id: string
}