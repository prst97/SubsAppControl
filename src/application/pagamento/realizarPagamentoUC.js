import { ServicoCadastramento } from '../../domain/services/servicoCadastramento.service';
import { ServicoPagamento } from '../../domain/services/servicoPagamentos.service';
import { Injectable, Dependencies, HttpException, HttpStatus, forwardRef } from '@nestjs/common';
import { Observer } from '../../infraestructure/observer.js';


@Injectable()
@Dependencies(forwardRef(() => ServicoPagamento), ServicoCadastramento)
export class RealizarPagamentoUC {
    constructor(servicoPagamento, servicoCadastramento) {
        this.servicoCadastramento = servicoCadastramento;
        this.servicoPagamento = servicoPagamento;
        this.pagamentoObserver = new Observer();
    }

    async execute(pagamento) {
        const assinatura = await this.servicoCadastramento.recuperarAssinaturaPorCodigo(pagamento.codAssinatura.codigo)
        const aplicativo = await this.servicoCadastramento.recuperarAplicativoPorCodigo(assinatura.codApp.codigo)

        console.log(aplicativo)
        if(pagamento.valorPago === aplicativo.custoMensal) {
            const pagamentoRealizado = await this.servicoPagamento.registrarPagamento(pagamento);
            return pagamentoRealizado;
        } else {
            throw new HttpException('O valor pago não corresponde ao custo mensal solicitado pelo aplicativo', HttpStatus.BAD_REQUEST)
        }
    }

    subscribeToPaymentNotifications(fn) {
        this.pagamentoObserver.subscribe(fn);
    }
}