import Joi from 'joi';

export const UsuarioCriarDtoSchema = Joi.object({
    usuario: Joi.string().alphanum().max(30).required(),
    senha: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,30}$')).required(),
    role: Joi.string().min(1).max(20).required()
}).options({
    abortEarly: false
});