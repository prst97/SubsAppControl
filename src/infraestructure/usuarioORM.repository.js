import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IUsuarioModelRepository } from '../domain/repositories/IUsuarioModelRepository';
import { UsuarioModel } from '../domain/entities/usuario.model';
import { Usuario } from './usuario.entity';

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

  async trocarSenha(usuario, senha) {
    let update = await this.#usuarioRep
      .createQueryBuilder()
      .update('Usuario')
      .set({
        senha: senha,
      })
      .where({
        usuario: usuario,
      })
      .execute();
    return true;
  }

  async removerUsuario(user) {
    const usuario = await this.#usuarioRep.findOneBy({ usuario: user });
    if (usuario) {
      await this.#usuarioRep.remove(usuario);
      return true;
    }
    return false;
  }

  static createFromObject({ usuario, senha }) {
    let usuarioModel = new UsuarioModel();
    usuarioModel.usuario = usuario;
    usuarioModel.senha = senha;

    return usuarioModel;
  }
}
