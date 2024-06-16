import Joi from 'joi';

export const AssinaturaAtualizarDtoSchema = Joi.object({
    inicioVigencia: Joi.string().isoDate(),
    fimVigencia: Joi.string().isoDate(),
    status: Joi.string().uppercase(),
}).options({
    abortEarly: false
});