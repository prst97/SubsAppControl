import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IClienteModelRepository } from '../../../domain/repositories/IClienteModelRepository';
import { ClienteModel } from '../../../domain/entities/cliente.model';
import { Cliente } from '../Entities/cliente.entity';

@Injectable()
@Dependencies(getRepositoryToken(Cliente))
export class ClienteRepositoryORM  extends IClienteModelRepository{
  #clienteRep;

  constructor(clientes){
    super();
    this.#clienteRep = clientes;
  }

  async cadastrarCliente(cliente) {
    let resp = await this.#clienteRep.save(cliente);
    return ClienteRepositoryORM.createFromObject(resp);
  }
    
  async buscarTodosClientes() { 
    const resp = await this.#clienteRep.find({})
    return resp.map(ClienteRepositoryORM.createFromObject);
  }

  async recuperarPorCodigo(codigo){
    let cliente = await this.#clienteRep.findOneBy({codigo: codigo});
    return ClienteRepositoryORM.createFromObject(cliente);
  }

  async removerCliente(codigo) {
    const cliente = await this.#clienteRep.findOneBy({ codigo });
    if (cliente) {
      await this.#clienteRep.remove(cliente);
    }
  }

  static createFromObject({codigo, nome, email}){
    let clienteModel = new ClienteModel();
    clienteModel.codigo = codigo;
    clienteModel.nome = nome;
    clienteModel.email = email;

    return clienteModel;
  }
}
