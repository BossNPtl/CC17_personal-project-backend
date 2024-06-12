const express = require('express');
const userController = require('../controllers/user-controller');
const authenticate = require('../middlewares/authenticate');
const { renameValidator } = require('../middlewares/validator-middleware');

const userRouter = express.Router();

userRouter.patch('/rename', authenticate, renameValidator, userController.rename);

module.exports = userRouter;
