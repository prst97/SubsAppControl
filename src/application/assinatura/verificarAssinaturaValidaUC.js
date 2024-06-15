import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoAssinaturasValidas } from '../../domain/services/servicoAssinaturasValidas.service';
import { ServicoCadastramento } from '../../domain/services/servicoCadastramento.service';

@Injectable()
@Dependencies(ServicoAssinaturasValidas, ServicoCadastramento)
export class VerificarAssinaturaValidaUC {
    constructor(servicoAssinaturasValidas, servicoCadastramento) {
        this.servicoAssinaturasValidas = servicoAssinaturasValidas;
        this.servicoCadastramento = servicoCadastramento;
    }

    async execute(codigo) {
        const assinatura = await this.servicoCadastramento.recuperarAssinaturaPorCodigo(codigo);
        const isValida = await this.servicoAssinaturasValidas.verificarAssinaturaValida(assinatura);
        let statusAtualizado;

        if (!isValida) {
            statusAtualizado = {
                status: "CANCELADA"
            }
        } else {
            statusAtualizado = {
                status: "ATIVA"
            }
        }

        return await this.servicoAssinaturasValidas.atualizarAssinatura(assinatura.codigo, statusAtualizado)   
    }
}