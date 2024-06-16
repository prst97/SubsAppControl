import { Controller, Dependencies, Get, Delete, Bind, Param, Post, Body, Patch, HttpException, HttpStatus, UsePipes, UseGuards } from '@nestjs/common';
import { ServicoCadastramento } from '../../domain/services/servicoCadastramento.service';
import { CriarUsuarioValidatorPipe } from '../../validations/usuario/usuario-criar.validator';
import { AtualizarSenhaUsuarioValidatorPipe } from '../../validations/usuario/usuario-criar.validator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/roles/roles.decorator';

@Controller('servcad')
@Dependencies(ServicoCadastramento) 
export class UsuarioController {
    constructor(servicoCadastramento) {
        this.servicoCadastramento = servicoCadastramento;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get('usuarios')
    async getUsuarios() {
        try {
            const usuarios = await this.servicoCadastramento.buscarTodosUsuarios();
            if (usuarios.length > 0) {
                return usuarios
            } else {
                console.log(`error: `, 'Lista de usuários está vazia')
                throw new HttpException('Lista de usuários está vazia', HttpStatus.NOT_FOUND)
            }
        } catch (error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post('cadastrarUsuario')
    @Bind(Body())
    @UsePipes(CriarUsuarioValidatorPipe)
    async postUsuario(usuario) {
        try {
            return await this.servicoCadastramento.cadastrarUsuario(usuario);
        } catch (error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Patch('usuarios/trocarSenha/:usuario')
    @Bind(Param('usuario'), Body(new AtualizarSenhaUsuarioValidatorPipe()))
    async patchUsuario(usuario, dados) {
        try {
            return await this.servicoCadastramento.trocarSenhaUsuario(usuario, dados)
        } catch(error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete('removerUsuario/:usuario')
    @Bind(Param('usuario'))
    async deleteUsuario(usuario) {
        try {
            await this.servicoCadastramento.removerUsuario(usuario);
            return {description: `Usuário de nome ${usuario} deletado com sucesso`}
        } catch (error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.NOT_FOUND)
        }
    }
}
