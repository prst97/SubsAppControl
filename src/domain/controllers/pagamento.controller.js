import { Controller, Dependencies, Get, Delete, Bind, Param, Post, Patch, Body } from '@nestjs/common';
import { PagamentoRepositoryORM } from '../../infraestructure/pagamentoORM.repository';

@Controller('servcad')
@Dependencies(PagamentoRepositoryORM) 
export class PagamentoController {
    constructor(pagamentoRepository) {
        this.pagamentoRepository = pagamentoRepository;
    }

    @Get('pagamentos')
    async getTodosPagamentos() {
        return await this.pagamentoRepository.buscarTodosPagamentos();
    }

    @Get('pagamentos/:codigo')
    @Bind(Param('codigo'))
    async getPagamentoPorCodigo(codigo) {
        return await this.pagamentoRepository.recuperarPorCodigo(codigo);
    }

    @Post('registrarPagamento')
    @Bind(Body())
    async postPagamento(pagamento) {
        return await this.pagamentoRepository.registrarPagamento(pagamento);
    }

    @Delete('removerPagamento/:codigo')
    @Bind(Param('codigo'))
    async deletePagamento(codigo) {
        await this.pagamentoRepository.removerPagamento(codigo);
    }
}