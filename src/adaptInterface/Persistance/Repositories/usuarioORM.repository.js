import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IUsuarioModelRepository } from '../../../domain/repositories/IUsuarioModelRepository';
import { UsuarioModel } from '../../../domain/entities/usuario.model';
import { Usuario } from '../Entities/usuario.entity';

@Injectable()
@Dependencies(getRepositoryToken(Usuario))
export class UsuarioRepositoryORM extends IUsuarioModelRepository {
  #usuarioRep;

  constructor(usuarioRep) {
    super();
    this.#usuarioRep = usuarioRep;
  }

  async cadastrarUsuario(usuario) {
    let resp = await this.#usuarioRep.save(usuario);
    return UsuarioRepositoryORM.createFromObject(resp);
  }

  async buscarUsuarios() {
    const resp = await this.#usuarioRep.find({});
    return await resp.map(UsuarioRepositoryORM.createFromObject);
  }

  async buscarUsuarioPorNome(nome) {
    const usuario = await this.#usuarioRep.findOneBy({ usuario: nome });
    return UsuarioRepositoryORM.createFromObject(usuario);
  }

  async trocarSenha(usuario, senha) {
    let update = await this.#usuarioRep
      .createQueryBuilder()
      .update('Usuario')
      .set({ senha: senha })
      .where({ usuario: usuario })
      .execute();
    return true;
  }

  async removerUsuario(usuario) {
    const user = await this.#usuarioRep.findOneBy({ usuario: usuario });
    if (user) {
      await this.#usuarioRep.remove(user);
    }
  }

  static createFromObject({ id, usuario, senha, role }) {
    let usuarioModel = new UsuarioModel();
    usuarioModel.id = id;
    usuarioModel.usuario = usuario;
    usuarioModel.senha = senha;
    usuarioModel.role = [role];

    return usuarioModel;
  }
}
