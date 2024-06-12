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

exports.checkAdminValidator = (req, res, next) => {
    console.log('################')
    const user = req.user
    console.log(user.isAdmin)
    if (!user.isAdmin) {
        return res.status(400).json({ message: 'You not have premission'})
    }
    next();
};

exports.createAlbumValidator = (req, res, next) => {
    
};