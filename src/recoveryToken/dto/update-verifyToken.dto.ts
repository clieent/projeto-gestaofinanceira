import { PartialType } from '@nestjs/mapped-types';
import { CreateVerifyTokenDto } from './create-verifyToken.dto';

export class UpdateVerifyTokenDto extends PartialType(CreateVerifyTokenDto) {}
