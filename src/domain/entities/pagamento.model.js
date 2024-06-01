export class PagamentoModel {
    codigo;
    codAssinatura;
    valorPago;
    dataPagamento;

    constructor(codigo, codAssinatura, valorPago, dataPagamento) {
      this.codigo = codigo;
      this.codAssinatura = codAssinatura;
      this.valorPago = valorPago;
      this.dataPagamento = dataPagamento;
    }
}