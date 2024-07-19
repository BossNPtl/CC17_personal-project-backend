const express = require('express');
const authenticate = require('../middlewares/authenticate');
const { checkAdminValidator } = require('../middlewares/validator-middleware');
const albumController = require('../controllers/album-controller');
const upload = require('../middlewares/upload-middleware');

const albumRouter = express.Router();

albumRouter.get('/allAlbum', albumController.getAllAlbum);
albumRouter.post('/addAlbum', authenticate, checkAdminValidator,
    upload.fields([
        { name: "picture_album", maxCount: 1 },
        { name: "picture_band", maxCount: 1 },
    ]),
    albumController.createAlbum
);
albumRouter.get('/:albumId', albumController.selectAlbum);
albumRouter.post('/:albumId/addSong', authenticate, checkAdminValidator, albumController.addSong);
albumRouter.get('/:albumId/allSong', albumController.getAllSong);
albumRouter.patch('/:albumId/deleteAlbum', authenticate, checkAdminValidator, albumController.deleteAlbum);

module.exports = albumRouter;