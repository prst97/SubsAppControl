import Joi from 'joi';

export const PagamentoCriarDtoSchema = Joi.object({
    codAssinatura: Joi.number().positive(),
    valorPago: Joi.number().precision(2).positive().required(),
    dataPagamento: Joi.string().isoDate().required()
}).options({
    abortEarly: false
});