const Joi = require('joi');

exports.postCommentSchema = Joi.object({
    comment: Joi.string().required()
});

exports.editCommentSchema = Joi.object({
    comment: Joi.string().required()
});