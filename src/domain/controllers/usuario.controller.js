import { Controller, Dependencies, Get, Delete, Bind, Param, Post, Patch, Body } from '@nestjs/common';
import { UsuarioRepositoryORM } from '../../infraestructure/usuarioORM.repository';

@Controller('servcad')
@Dependencies(UsuarioRepositoryORM) 
export class UsuarioController {
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Get('usuarios')
    async getUsuarios() {
        return await this.usuarioRepository.buscarUsuarios();
    }

    @Post('cadastrarUsuario')
    @Bind(Body())
    async postUsuario(usuario) {
        return await this.usuarioRepository.cadastrarUsuario(usuario);
    }

    @Patch('trocarSenha/:usuario')
    @Bind(Param('usuario'), Body())
    async patchSenha(usuario, body) {
        const { senha } = body;
        return await this.usuarioRepository.trocarSenha(usuario, senha);
    }

    @Delete('removerUsuario/:usuario')
    @Bind(Param('usuario'))
    async deleteUsuario(usuario) {
        await this.usuarioRepository.removerUsuario(usuario);
    }
}
