const commentService = require("../services/comment-service");

const commentController = {};

commentController.postComment = async (req, res, next) => {
    try {
        console.log('%%%%%%%%%%%%%%%%%%%%%');
        const data = {...req.body}
        // const data = req.input
        data.user_id = req.user.id
        data.album_id = +req.params.albumId
        console.log('data ------>>>', data)
        const post = await commentService.postComment(data);
        console.log('post ------>>>', data)
        res.status(201).json(post);
        
    }   catch (err) {
        next(err);
    }
};

commentController.getAllComment = async (req, res, next) => {
    try {
        console.log('%%%%%%%%%%%%%%%%%%%%%');
        const album_id = +req.params.albumId;
        console.log('album_id --->>', album_id);
        const comment = await commentService.getAllComment(album_id);
        console.log(comment)
        res.status(200).json(comment);
    }   catch (err) {
        next(err);
    }
};

commentController.editComment = async (req, res, next) => {
    try {
        console.log('%%%%%%%%%%%%%%%%%%%%%');
        const data = {...req.body};
        console.log(data);
        const id = +req.params.id
        console.log(id);
        const edit = await commentService.patchComment(id, data);
        res.status(200).json(edit);
    }   catch (err) {
        next(err);
    }
};

commentController.deleteComment = async (req, res, next) => {
    try {
        console.log('%%%%%%%%%%%%%%%%%%%%%');
        const id = +req.params.id
        console.log(id);
        const comment = await commentService.deleteComment(id);
        res.status(200).json(comment);

    }   catch (err) {
        next(err);
    }
};

module.exports = commentController;