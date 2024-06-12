// const createError require()
const { registerSchema, loginSchema } = require('../validators/auth-validator');
const { renameSchema } = require('../validators/user-validate');

exports.registerValidator = (req, res, next) => {
    const { value, error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    req.input = value;
    next();
};

exports.loginValidator = (req, res, next) => {
    const { value, error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    req.input = value;
    next();
};

exports.renameValidator = (req, res, next) => {
    const { value, error } = renameSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    req.input = value;
    next();
};

exports.checkRoleValidator = (req, res, next) => {
    const user = req.user
    // console.log(user.role)
    if (user.role !== 'admin') {
        return res.status(400).json({ message: 'You not have premission'})
    }
    next();
};