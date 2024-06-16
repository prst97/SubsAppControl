import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoCadastramento } from '../../domain/services/servicoCadastramento.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
@Dependencies(ServicoCadastramento, JwtService)
export class AuthService {
    constructor(servicoCadastramento, jwtService) {
        this.servicoCadastramento = servicoCadastramento;
        this.jwtService = jwtService;
    }

    async validarUsuario(nome, senha) {
        const usuario = await this.servicoCadastramento.buscarUsuarioPorNome(nome);
        if (usuario && usuario.senha === senha) {
            const { senha, ...resultado } = usuario;
            return resultado;
        }
        return null;
    }

    async login(usuario) {
        const payload = { username: usuario.usuario, sub: usuario.id, roles: usuario.role };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
