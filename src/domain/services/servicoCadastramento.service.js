import { Injectable, Dependencies } from '@nestjs/common';
import { AplicativoRepositoryORM } from '../../adaptInterface/Persistance/Repositories/aplicativoORM.repository';
import { AssinaturaRepositoryORM } from '../../adaptInterface/Persistance/Repositories/assinaturaORM.repository';
import { ClienteRepositoryORM } from '../../adaptInterface/Persistance/Repositories/clienteORM.repository';
import { PagamentoRepositoryORM } from '../../adaptInterface/Persistance/Repositories/pagamentoORM.repository';

@Injectable()
@Dependencies(
  AplicativoRepositoryORM, 
  AssinaturaRepositoryORM, 
  ClienteRepositoryORM, 
  PagamentoRepositoryORM
  )
export class ServicoCadastramento {
  constructor(
    aplicativoRepository, 
    assinaturaRepository, 
    clienteRepository, 
    pagamentoRepository,
  ) {
    this.aplicativoRepository = aplicativoRepository;
    this.assinaturaRepository = assinaturaRepository;
    this.clienteRepository = clienteRepository;
    this.pagamentoRepository = pagamentoRepository;
  }

  // Aplicativo
  async buscarTodosApps() {
    return this.aplicativoRepository.buscarTodosApps();
  }

  async recuperarAplicativoPorCodigo(codigo) {
    return this.aplicativoRepository.recuperarPorCodigo(codigo);
  }

  async cadastrarApp(aplicativo) {
    return this.aplicativoRepository.cadastrarApp(aplicativo);
  }

  async atualizarCustoMensal(codigo, custoMensal) {
    return this.aplicativoRepository.atualizarCustoMensal(codigo, custoMensal);
  }

  async removerApp(codigo) {
    return this.aplicativoRepository.removerApp(codigo);
  }

  // Assinatura
  async cadastrarAssinatura(assinatura) {
    return this.assinaturaRepository.cadastrarAssinatura(assinatura);
  }

  async buscarTodasAssinaturas() {
    return this.assinaturaRepository.buscarTodasAssinaturas();
  }

  async buscarAssinaturasPorTipo(tipo) {
    return this.assinaturaRepository.buscarPorTipoStatus(tipo);
  }

  async buscarAssinaturasPorApp(codApp) {
    return this.assinaturaRepository.buscarPorApp(codApp);
  }

  async buscarAssinaturasPorCliente(codCli) {
    return this.assinaturaRepository.buscarPorCliente(codCli);
  }

  async recuperarAssinaturaPorCodigo(codigo) {
    return this.assinaturaRepository.recuperarPorCodigo(codigo);
  }

  async removerAssinatura(codigo) {
    return this.assinaturaRepository.removerAssinatura(codigo);
  }

  // Cliente
  async cadastrarCliente(cliente) {
    return this.clienteRepository.cadastrarCliente(cliente);
  }

  async buscarTodosClientes() {
    return this.clienteRepository.buscarTodosClientes();
  }

  async recuperarClientePorCodigo(codigo) {
    return this.clienteRepository.recuperarPorCodigo(codigo);
  }

  async removerCliente(codigo) {
    return this.clienteRepository.removerCliente(codigo);
  }

}
