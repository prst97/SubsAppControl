import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Dependencies, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
@Dependencies(AuthService)
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(authService) {
        super({
            usernameField: 'usuario',
            passwordField: 'senha'
        });
        this.authService = authService;
    }

    async validate(username, password) {
        const user = await this.authService.validarUsuario(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}