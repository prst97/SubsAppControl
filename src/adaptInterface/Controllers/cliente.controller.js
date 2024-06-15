import { Controller, Dependencies, Get, Delete, Bind, Param, Post, Body, HttpStatus, HttpException, ParseIntPipe, UsePipes } from '@nestjs/common';
import { ServicoCadastramento } from '../../domain/services/servicoCadastramento.service';
import { CriarClienteValidatorPipe } from '../../validations/cliente/cliente-criar.validator';

@Controller('servcad')
@Dependencies(ServicoCadastramento) 
export class ClienteController {
    constructor(servicoCadastramento) {
        this.servicoCadastramento = servicoCadastramento;
    }

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
