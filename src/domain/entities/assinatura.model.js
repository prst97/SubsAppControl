export class AssinaturaModel {
    codigo;
    codApp;
    codCli;
    inicioVigencia;
    fimVigencia;
    status;
  
    constructor(codigo, codApp, codCli, inicioVigencia, fimVigencia, status) {
      this.codigo = codigo;
      this.codApp = codApp;
      this.codCli = codCli;
      this.inicioVigencia = inicioVigencia;
      this.fimVigencia = fimVigencia;
      this.status = status;
    }
}