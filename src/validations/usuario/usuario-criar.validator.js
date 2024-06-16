import { BadRequestException } from '@nestjs/common';
import { UsuarioCriarDtoSchema } from './usuario-criar.dto';
import { UsuarioAtualizarSenhaDtoSchema } from './usuario-atualizar.dto';

export class CriarUsuarioValidatorPipe {
    transform(value) {
        const {error} = UsuarioCriarDtoSchema.validate(value);
        if(error) {
            const mensagens = error.details.map(d => d.message).join(', ');
            throw new BadRequestException(mensagens);
        }
        return value;
    }
}

export class AtualizarSenhaUsuarioValidatorPipe {
    transform(value) {
        const {error} = UsuarioAtualizarSenhaDtoSchema.validate(value);
        if(error) {
            const mensagens = error.details.map(d => d.message).join(', ');
            throw new BadRequestException(mensagens);
        }
        return value;
    }
}