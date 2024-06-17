const commentService = require("../services/comment-service");

const commentController = {};

commentController.postComment = async (req, res, next) => {
    try {
        const data = {...req.body}
        // const data = req.input
        data.user_id = req.user.id
        data.album_id = +req.params.albumId
        const post = await commentService.postComment(data);
        res.status(201).json(post);
        
    }   catch (err) {
        next(err);
    }
};

commentController.getAllComment = async (req, res, next) => {
    try {
        const album_id = +req.params.albumId;
        const comment = await commentService.getAllComment(album_id);
        res.status(200).json(comment);
    }   catch (err) {
        next(err);
    }
};

commentController.editComment = async (req, res, next) => {
    try {
        const data = req.body.message;
        const id = +req.params.id
        const edit = await commentService.patchComment(id, data);
        res.status(200).json(edit);
    }   catch (err) {
        next(err);
    }
};

commentController.deleteComment = async (req, res, next) => {
    try {
        const id = +req.params.id
        const comment = await commentService.deleteComment(id);
        res.status(200).json(comment);

    }   catch (err) {
        next(err);
    }
};

module.exports = commentController;