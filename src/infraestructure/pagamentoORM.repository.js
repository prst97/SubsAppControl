import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IPagamentoModelRepository } from '../domain/repositories/IPagamentoModelRepository';
import { PagamentoModel } from '../domain/entities/pagamento.model';
import { Pagamento } from './pagamento.entity';
import { Assinatura } from './assinatura.entity';

@Injectable()
@Dependencies(getRepositoryToken(Pagamento), getRepositoryToken(Assinatura))
export class PagamentoRepositoryORM  extends IPagamentoModelRepository{
  #pagamentoRep;
  #assinaturaRep;

  constructor(pagamentoRep, assinaturaRep) {
    super();
    this.#pagamentoRep = pagamentoRep
    this.#assinaturaRep = assinaturaRep;
  }

  async registrarPagamento(pagamento) {
    const assinatura = await this.#assinaturaRep.findOneBy({ codigo: pagamento.codAssinatura });

    if (!assinatura) {
        throw new Error('Assinatura não encontrada');
      }
  
    const novoPagamento = this.#pagamentoRep.create({
        ...pagamento,
        codAssinatura: assinatura
        });
  
    let resp = await this.#pagamentoRep.save(novoPagamento);
    return PagamentoRepositoryORM.createFromObject(resp);
    }
  
    
    async buscarTodosPagamentos() { 
        const resp = await this.#pagamentoRep.find({})
        return resp.map(PagamentoRepositoryORM.createFromObject);
    }

  async recuperarPorCodigo(codigo){
    let pagamento = await this.#pagamentoRep.findOneBy({codigo});
    return PagamentoRepositoryORM.createFromObject(pagamento);
  }

  async removerPagamento(codigo) {
    const pagamento = await this.#pagamentoRep.findOneBy({ codigo });
    if (pagamento) {
      await this.#pagamentoRep.remove(pagamento);
      return true;
    }
    return false;
  }

  static createFromObject({codigo, codAssinatura, valorPago, dataPagamento}){
    let pagamentoModel = new PagamentoModel();
    pagamentoModel.codigo = codigo;
    pagamentoModel.codAssinatura = codAssinatura;
    pagamentoModel.valorPago = valorPago;
    pagamentoModel.dataPagamento = dataPagamento;

    return pagamentoModel;
  }
}
