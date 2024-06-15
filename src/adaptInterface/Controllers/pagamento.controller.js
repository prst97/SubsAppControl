import { Controller, Dependencies, Get, Delete, Bind, Param, Post, Body, HttpException, HttpStatus, ParseIntPipe, UsePipes } from '@nestjs/common';
import { ServicoPagamento } from '../../domain/services/servicoPagamentos.service';
import { CriarPagamentoValidatorPipe } from '../../validations/pagamento/pagamento-criar.validator';

@Controller('servcad')
@Dependencies(ServicoPagamento) 
export class PagamentoController {
    constructor(servicoPagamento) {
        this.servicoPagamento = servicoPagamento;
    }

    @Get('pagamentos')
    async getTodosPagamentos() {
        try {
            const pagamentos = await this.servicoPagamento.buscarTodosPagamentos();
            if (pagamentos.length > 0) {
                return pagamentos
            } else {
                console.log(`error: `, 'Lista de pagamentos vazia')
                throw new HttpException('Lista de pagamentos está vazia', HttpStatus.NOT_FOUND)
            }
        } catch (error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get('pagamentos/:codigo')
    @Bind(Param('codigo', ParseIntPipe))
    async getPagamentoPorCodigo(codigo) {
        try{
            return await this.servicoPagamento.recuperarPagamentoPorCodigo(codigo);
        } catch (error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.NOT_FOUND)
        }
    }

    @Post('registrarPagamento')
    @Bind(Body())
    @UsePipes(CriarPagamentoValidatorPipe)
    async postPagamento(pagamento) {
        try {
            return await this.servicoPagamento.realizarPagamento(pagamento);
        } catch (error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Delete('removerPagamento/:codigo')
    @Bind(Param('codigo', ParseIntPipe))
    async deletePagamento(codigo) {
        try {
            await this.servicoPagamento.removerPagamento(codigo);
            return { description: `Pagamento de código ${codigo} deletado com sucesso` };
        } catch (error) {
            console.log(`error: `, error.message);
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
