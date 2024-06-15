import Joi from 'joi';

export const AssinaturaCriarDtoSchema = Joi.object({
    codApp: Joi.number().positive().required(),
    codCli: Joi.number().positive().required(),
    inicioVigencia: Joi.date().required(),
    fimVigencia: Joi.date().required(),
    status: Joi.string().uppercase().required()
}).options({
    abortEarly: false
});