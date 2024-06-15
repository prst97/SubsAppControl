import { Injectable, Dependencies } from '@nestjs/common';
import moment from "../../../node_modules/moment/moment";
import { ServicoCadastramento } from '../../domain/services/servicoCadastramento.service';
import { ServicoAssinaturasValidas } from '../../domain/services/servicoAssinaturasValidas.service';

@Injectable()
@Dependencies(ServicoCadastramento, ServicoAssinaturasValidas)
export class NotificarAssinaturaUC {
    constructor(servicoCadastramento, servicoAssinaturasValidas) {
        this.servicoCadastramento = servicoCadastramento;
        this.servicoAssinaturasValidas = servicoAssinaturasValidas;
    }

    async execute(pagamento) {
        const assinatura = await this.servicoCadastramento.recuperarAssinaturaPorCodigo(pagamento.codAssinatura.codigo)
        if (!assinatura) {
            throw new Error('Assinatura não encontrada');
        }
        
        let novoInicioVigencia;
        let novoFimVigencia;
        let novoStatus = 'ATIVA';

        const dataAtual = moment();
        const fimVigencia = moment(assinatura.fimVigencia);

        if (fimVigencia.isBefore(dataAtual)) {
            novoInicioVigencia = dataAtual.toDate();
            novoFimVigencia = moment(novoInicioVigencia).add(1, 'month').toDate();
        } else {
            novoInicioVigencia = assinatura.inicioVigencia;
            novoFimVigencia = moment(assinatura.fimVigencia).add(1, 'month').toDate();
        }

        const assinaturaAtualizada = {
            inicioVigencia: novoInicioVigencia,
            fimVigencia: novoFimVigencia,
            status: novoStatus
        }

        await this.servicoAssinaturasValidas.atualizarAssinatura(assinatura.codigo, assinaturaAtualizada);

        return await this.servicoCadastramento.recuperarAssinaturaPorCodigo(assinatura.codigo);
    }
}