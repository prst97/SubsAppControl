import { BadRequestException } from '@nestjs/common';
import { AssinaturaCriarDtoSchema } from './assinatura-criar.dto';
import { AssinaturaAtualizarDtoSchema } from './assinatura-atualizar.dto';

export class CriarAssinaturaValidatorPipe {
    transform(value) {
        const {error} = AssinaturaCriarDtoSchema.validate(value);
        if(error) {
            const mensagens = error.details.map(d => d.message).join(', ');
            throw new BadRequestException(mensagens);
        }
        return value;
    }
}

export class AtualizarAssinaturaValidatorPipe {

    transform(value) {
        const {error} = AssinaturaAtualizarDtoSchema.validate(value);
        if (error) {
            const mensagens = error.details.map(d => d.message).join();
            throw new BadRequestException(mensagens);
        }
        return value;
    }
}