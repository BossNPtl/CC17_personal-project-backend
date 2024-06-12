const Joi = require('joi');

exports.renameSchema = Joi.object({
    name: Joi.string().required().pattern(/^[a-zA-Z0-9]{3,}$/)
})