export class ClienteModel {
    codigo;
    nome;
    email;
    assinaturas;

    constructor(codigo, nome, email, assinaturas) {
      this.codigo = codigo;
      this.nome = nome;
      this.email = email;
      this.assinaturas = assinaturas;
    }
}