import { Injectable, Dependencies } from '@nestjs/common';
import { AssinaturaRepositoryORM } from '../../adaptInterface/Persistance/Repositories/assinaturaORM.repository';
import moment from 'moment';

@Injectable()
@Dependencies(AssinaturaRepositoryORM)
export class ServicoAssinaturasValidas {
  constructor(assinaturaRepository) {
    this.assinaturaRepository = assinaturaRepository;
  }

  async atualizarAssinatura(codigo, dados) {
    return await this.assinaturaRepository.atualizarParcial(codigo, dados);
  }

  async verificarAssinaturaValida (assinatura) {
    const hoje = moment();
    const inicioVigencia = moment(assinatura.inicioVigencia);
    const fimVigencia = moment(assinatura.fimVigencia);

    return hoje.isBetween(inicioVigencia, fimVigencia, 'day', '[]');
  }
}
