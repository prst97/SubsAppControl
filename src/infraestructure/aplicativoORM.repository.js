import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IAplicativoModelRepository } from '../domain/repositories/IAplicativoModelRepository';
import { AplicativoModel } from '../domain/entities/aplicativo.model';
import { Aplicativo } from './aplicativo.entity';

@Injectable()
@Dependencies(getRepositoryToken(Aplicativo))
export class AplicativoRepositoryORM  extends IAplicativoModelRepository{
  #aplicativoRep;

  constructor(aplicativos){
    super();
    this.#aplicativoRep = aplicativos;
  }

  async cadastrarApp(aplicativo) {
    let resp = await this.#aplicativoRep.save(aplicativo);
    return AplicativoRepositoryORM.createFromObject(resp);
  }
    
  async buscarTodosApps() { 
    const resp = await this.#aplicativoRep.find({})
    return resp.map(AplicativoRepositoryORM.createFromObject);
  }

  async atualizarCustoMensal(codigo, custoMensal){
    let ok = await this.#aplicativoRep
    .createQueryBuilder()
    .update(custoMensal)
    .set({
      custoMensal: custoMensal,
    })
    .where({
      codigo: codigo,
    })
    .execute();
    return ok;
  }

  async recuperarPorCodigo(codigo){
    let aplicativo = await this.#aplicativoRep.findOneBy({codigo});
    return AplicativoRepositoryORM.createFromObject(aplicativo);
  }

  async removerApp(codigo) {
    const aplicativo = await this.#aplicativoRep.findOneBy({ codigo });
    if (aplicativo) {
      await this.#aplicativoRep.remove(aplicativo);
      return true;
    }
    return false;
  }

  static createFromObject({codigo, nome, custoMensal}){
    let aplicativoModel = new AplicativoModel();
    aplicativoModel.codigo = codigo;
    aplicativoModel.nome = nome;
    aplicativoModel.custoMensal = custoMensal;

    return aplicativoModel;
  }
}
