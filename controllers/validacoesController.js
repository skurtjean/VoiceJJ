const {check, validationResult} = require('express-validator')
module.exports = {
    user: [
        check('nome')
            .isLength({min:3}).withMessage('Seu nome deve conter ao menos 3 caracteres')
            .isLength({max:35}).withMessage('Seu nome deve conter no máximo 35 caracteres')
            .not().isEmpty().withMessage('Você deve ter um nome'),
        check('email')
            .isLength({min: 10}).withMessage('Seu e-mail deve ter ao menos 10 caracteres')
            .isLength({max: 100}).withMessage('Seu e-mail deve ter no máximo 100 caracteres')
            .not().isEmpty().withMessage('E-mail é obrigatório')
            .isEmail().withMessage('Você deve ter um e-mail'),
        check('pass')
            .not().isEmpty().withMessage('Você deve ter uma senha')
    ]
}