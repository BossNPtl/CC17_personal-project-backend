const express = require('express');
const authenticate = require('../middlewares/authenticate');
const { checkAdminValidator } = require('../middlewares/validator-middleware');
const albumController = require('../controllers/album-controller');

const albumRouter = express.Router();

albumRouter.post('/addAlbum', authenticate, checkAdminValidator, albumController.createAlbum);
albumRouter.get('/:albumId', albumController.selectAlbum);

module.exports = albumRouter;