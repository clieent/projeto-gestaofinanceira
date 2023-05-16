import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MenssagesHelper } from 'src/helpers/menssage.helper';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService){
        super({
            usernameFild: 'email'
        })
    }

    async validate(email: string, password: string){
        const user = await this.authService.validateUser(email, password)

        if(!user) {
            throw new UnauthorizedException(MenssagesHelper.PASSWORD_OR_EMAIL_INVALID)
        }

        return user
    }
}