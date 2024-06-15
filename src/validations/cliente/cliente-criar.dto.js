import Joi from 'joi';

export const ClienteCriarDtoSchema = Joi.object({
    nome: Joi.string().min(2).max(50).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
}).options({
    abortEarly: false
});