import { Controller, Dependencies, Get, Delete, Bind, Param, Post, Body, HttpStatus, HttpException, ParseIntPipe, UsePipes, UseGuards } from '@nestjs/common';
import { ServicoCadastramento } from '../../domain/services/servicoCadastramento.service';
import { CriarClienteValidatorPipe } from '../../validations/cliente/cliente-criar.validator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/roles/roles.decorator';

@Controller('servcad')
@Dependencies(ServicoCadastramento) 
export class ClienteController {
    constructor(servicoCadastramento) {
        this.servicoCadastramento = servicoCadastramento;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'comum')
    @Get('clientes')
    async getClientes() {
        try {
            const clientes = await this.servicoCadastramento.buscarTodosClientes();
            if (clientes.length > 0) {
                return clientes
            } else {
                console.log(`error: `, 'Lista de clientes está vazia')
                throw new HttpException('Lista de clientes está vazia', HttpStatus.NOT_FOUND)
            }
        } catch (error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'comum')
    @Get('clientes/:codigo')
    @Bind(Param('codigo', ParseIntPipe))
    async getClientesPorCodigo(codigo) {
        try {
            return await this.servicoCadastramento.recuperarClientePorCodigo(codigo);
        } catch(error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post('cadastrarCliente')
    @Bind(Body())
    @UsePipes(CriarClienteValidatorPipe)
    async postCliente(cliente) {
        try {
            return await this.servicoCadastramento.cadastrarCliente(cliente);
        } catch(error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete('removerCliente/:codigo')
    @Bind(Param('codigo', ParseIntPipe))
    async deleteCliente(codigo) {
        try {
            await this.servicoCadastramento.removerCliente(codigo);
            return {description: `Cliente de código ${codigo} deletado com sucesso`}
        } catch (error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
