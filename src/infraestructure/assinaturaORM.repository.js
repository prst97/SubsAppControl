import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IAssinaturaModelRepository } from '../domain/repositories/IAssinaturaModelRepository';
import { AssinaturaModel } from '../domain/entities/assinatura.model';
import { Assinatura } from './assinatura.entity';
import { Cliente } from './cliente.entity';
import { Aplicativo } from './aplicativo.entity';

@Injectable()
@Dependencies(getRepositoryToken(Assinatura), getRepositoryToken(Cliente), getRepositoryToken(Aplicativo))
export class AssinaturaRepositoryORM  extends IAssinaturaModelRepository{
  #assinaturaRep;
  #clienteRep;
  #aplicativoRep;

  constructor(assinaturaRep, clienteRep, aplicativoRep) {
    super();
    this.#assinaturaRep = assinaturaRep;
    this.#clienteRep = clienteRep;
    this.#aplicativoRep = aplicativoRep;
  }

  async cadastrarAssinatura(assinatura) {
    const cliente = await this.#clienteRep.findOneBy({ codigo: assinatura.codCli });
    const aplicativo = await this.#aplicativoRep.findOneBy({ codigo: assinatura.codApp });

    if (!cliente || !aplicativo) {
        throw new Error('Cliente ou Aplicativo não encontrados');
      }
  
    const novaAssinatura = this.#assinaturaRep.create({
        ...assinatura,
        codCli: cliente,
        codApp: aplicativo,
        });
  
    let resp = await this.#assinaturaRep.save(novaAssinatura);
    return AssinaturaRepositoryORM.createFromObject(resp);
    }
  
    
  async buscarTodasAssinaturas() { 
    const resp = await this.#assinaturaRep.find({})
    return resp.map(AssinaturaRepositoryORM.createFromObject);
  }

  async buscarPorCliente(codCli){
    const cliente = await this.#clienteRep.findOneBy({ codigo: codCli });
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    const busca = await this.#assinaturaRep.find({
      where: { codCli: cliente },
    });
    return busca.map(AssinaturaRepositoryORM.createFromObject);
  }

  async buscarPorApp(codApp) {
    const aplicativo = await this.#aplicativoRep.findOneBy({ codigo: codApp });
    if (!aplicativo) {
      throw new Error('Aplicativo não encontrado');
    }

    const busca = await this.#assinaturaRep.find({
      where: { codApp: aplicativo },
    });
    return busca.map(AssinaturaRepositoryORM.createFromObject);
  }

  async buscarPorTipoStatus(tipo) {
    let whereClause = {};
    if (tipo === 'ATIVAS') {
        whereClause = { status: 'ATIVA' };

        const busca = await this.#assinaturaRep.find({
            where: whereClause,
        });
        return busca.map(AssinaturaRepositoryORM.createFromObject);

    } else if (tipo === 'CANCELADAS') {
        whereClause = { status: 'CANCELADA' };

        const busca = await this.#assinaturaRep.find({
            where: whereClause,
        });
        return busca.map(AssinaturaRepositoryORM.createFromObject);
    } else if (tipo == 'TODAS') {

        const busca = await this.#assinaturaRep.find({});
        return busca.map(AssinaturaRepositoryORM.createFromObject);
    }
  }

  async recuperarPorCodigo(codigo){
    let assinatura = await this.#assinaturaRep.findOneBy({codigo});
    return AssinaturaRepositoryORM.createFromObject(assinatura);
  }

  async removerAssinatura(codigo) {
    const assinatura = await this.#assinaturaRep.findOneBy({ codigo });
    if (assinatura) {
      await this.#assinaturaRep.remove(assinatura);
      return true;
    }
    return false;
  }

  static createFromObject({codigo, codApp, codCli, inicioVigencia, fimVigencia, status}){
    let assinaturaModel = new AssinaturaModel();
    assinaturaModel.codigo = codigo;
    assinaturaModel.codApp = codApp;
    assinaturaModel.codCli = codCli;
    assinaturaModel.inicioVigencia = inicioVigencia;
    assinaturaModel.fimVigencia = fimVigencia
    assinaturaModel.status = status

    return assinaturaModel;
  }
}
