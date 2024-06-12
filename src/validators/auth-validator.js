const Joi = require('joi');

exports.registerSchema = Joi.object({
    email: Joi.string().email().required().trim(),
    name: Joi.string().pattern(/^[a-zA-Z0-9]{3,}$/),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{8,}$/),
    // password: Joi.string().pattern(/^(?=.*[A-Z].*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.{8,})/),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).strip()
});

exports.loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});