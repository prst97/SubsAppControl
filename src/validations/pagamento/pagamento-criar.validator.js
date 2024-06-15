import { BadRequestException } from '@nestjs/common';
import { PagamentoCriarDtoSchema } from './pagamento-criar.dto';

export class CriarPagamentoValidatorPipe {
    transform(value) {
        const {error} = PagamentoCriarDtoSchema.validate(value);
        if(error) {
            const mensagens = error.details.map(d => d.message).join(', ');
            throw new BadRequestException(mensagens);
        }
        return value;
    }
}