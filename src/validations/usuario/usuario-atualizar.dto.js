import Joi from 'joi';

export const UsuarioAtualizarSenhaDtoSchema = Joi.object({
    senha: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,30}$')).required()
}).options({
    abortEarly: false
});