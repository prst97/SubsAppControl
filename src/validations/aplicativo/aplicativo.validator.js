import { BadRequestException } from '@nestjs/common';
import { AplicativoCriarDtoSchema } from './aplicativo-criar.dto';
import { AplicativoAtualizarCustoDtoSchema } from './aplicativo-atualizarCusto.dto';

export class CriarAplicativoValidatorPipe {
    transform(value) {
        const {error} = AplicativoCriarDtoSchema.validate(value);
        if(error) {
            const mensagens = error.details.map(d => d.message).join(', ');
            throw new BadRequestException(mensagens);
        }
        return value;
    }
}

export class AtualizarCustoAplicativoValidatorPipe {

    transform(value, metadata) {
        const {error} = AplicativoAtualizarCustoDtoSchema.validate(value);
        if (error) {
            const mensagens = error.details.map(d => d.message).join();
            throw new BadRequestException(mensagens);
        }
        return value;
    }
}