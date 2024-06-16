import Joi from 'joi';

export const AplicativoAtualizarCustoDtoSchema = Joi.object({
    custoMensal: Joi.number().precision(2).positive().required()
}).options({
    abortEarly: false
});
