import { Controller, Dependencies, Get, Delete, Bind, Param, Post, Patch, Body } from '@nestjs/common';
import { ClienteRepositoryORM } from '../../infraestructure/clienteORM.repository';

@Controller('servcad')
@Dependencies(ClienteRepositoryORM) 
export class ClienteController {
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @Get('clientes')
    async getClientes() {
        return await this.clienteRepository.buscarTodosClientes();
    }

    @Get('clientes/:codigo')
    @Bind(Param('codigo'))
    async getClientesPorCodigo(codigo) {
        return await this.clienteRepository.recuperarPorCodigo(codigo);
    }

    @Post('cadastrarCliente')
    @Bind(Body())
    async postCliente(cliente) {
        return await this.clienteRepository.cadastrarCliente(cliente);
    }

    @Delete('removerCliente/:codigo')
    @Bind(Param('codigo'))
    async deleteCliente(codigo) {
        await this.clienteRepository.removerCliente(codigo);
    }
}