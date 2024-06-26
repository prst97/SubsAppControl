import Joi from 'joi';

export const AplicativoCriarDtoSchema = Joi.object({
    nome: Joi.string().min(1).max(50).required(),
    custoMensal: Joi.number().precision(2).positive().required()
}).options({
    abortEarly: false
});