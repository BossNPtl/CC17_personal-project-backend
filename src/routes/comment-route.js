const express = require('express');
const authenticate = require('../middlewares/authenticate');
const commentController = require('../controllers/comment-controller');
const { postCommentValidate, editCommentValidate } = require('../middlewares/comment-middleware');

const commentRouter = express.Router();

commentRouter.post('/:albumId/postComment', authenticate, commentController.postComment);
commentRouter.get('/:albumId/fetchComment', commentController.getAllComment);
commentRouter.patch('/:id/editComment', authenticate, commentController.editComment);
commentRouter.patch('/:id/deleteComment', authenticate, commentController.deleteComment);

module.exports = commentRouter;