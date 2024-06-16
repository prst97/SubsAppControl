export class UsuarioModel {
    id;
    usuario;
    senha;
    role;

    constructor(id, usuario, senha, role) {
      this.id = id;
      this.usuario = usuario;
      this.senha = senha;
      this.roles = role;
    }
}