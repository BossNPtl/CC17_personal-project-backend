const { postCommentSchema, editCommentSchema } = require("../validators/comment-validotor");

exports.postCommentValidate = (req, res, next) => {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@');
    const { value, error } = postCommentSchema.validate(req.user);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    req.input = value;
    next();
};

exports.editCommentValidate = (req, res, next) => {
    const { value, error } = editCommentSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    req.input = value;
    next();
};