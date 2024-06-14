const express = require('express');
const authenticate = require('../middlewares/authenticate');
const postController = require('../controllers/post-controller');

const commentRouter = express.Router();

commentRouter.post('/:albumId/post', authenticate, postController.postComment);
commentRouter.get('/:albumId/post', postController.postComment);
commentRouter.patch('/:albumId/post', authenticate, postController.editComment);
commentRouter.patch('/:albumId/post', authenticate, postController.deleteComment);

module.exports = commentRouter;