import { Injectable, Dependencies, forwardRef } from '@nestjs/common';
import { PagamentoRepositoryORM } from '../../adaptInterface/Persistance/Repositories/pagamentoORM.repository';
import { RealizarPagamentoUC } from '../../application/pagamento/realizarPagamentoUC';
import { NotificarAssinaturaUC } from '../../application/assinatura/notificarAssinaturaUC';

@Injectable()
@Dependencies(
  PagamentoRepositoryORM,
  forwardRef(() => RealizarPagamentoUC),
  NotificarAssinaturaUC
  )
export class ServicoPagamento {
  constructor(
    pagamentoRepository,
    realizarPagamentoUC,
    notificarAssinaturaUC
  ) {
    this.pagamentoRepository = pagamentoRepository;
    this.realizarPagamentoUC = realizarPagamentoUC;
    this.notificarAssinaturaUC = notificarAssinaturaUC;

    this.realizarPagamentoUC.subscribeToPaymentNotifications(async (pagamento) => {
      await this.notificarAssinaturaUC.execute(pagamento);
    });
  }

  // Pagamento
  async registrarPagamento(pagamento) {
    return this.pagamentoRepository.registrarPagamento(pagamento);
  }

  async buscarTodosPagamentos() {
    return this.pagamentoRepository.buscarTodosPagamentos();
  }

  async recuperarPagamentoPorCodigo(codigo) {
    return this.pagamentoRepository.recuperarPorCodigo(codigo);
  }

  async removerPagamento(codigo) {
    return this.pagamentoRepository.removerPagamento(codigo);
  }
  
  async realizarPagamento(pagamento) {
    const pagamentoRealizado = await this.realizarPagamentoUC.execute(pagamento);
    const assinaturaAtualizada = await this.notificarAssinaturaUC.execute(pagamentoRealizado);
    return assinaturaAtualizada;
  }
}
