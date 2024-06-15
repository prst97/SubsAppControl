import { BadRequestException } from '@nestjs/common';
import { ClienteCriarDtoSchema } from './cliente-criar.dto';

export class CriarClienteValidatorPipe {
    transform(value) {
        const {error} = ClienteCriarDtoSchema.validate(value);
        if(error) {
            const mensagens = error.details.map(d => d.message).join(', ');
            throw new BadRequestException(mensagens);
        }
        return value;
    }
}