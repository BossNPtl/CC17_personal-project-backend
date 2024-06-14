const adminService = require("../services/admin-service");
const albumService = require("../services/album-service");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");

const albumController = {};

albumController.getAllAlbum = async (req, res, next) => {
    try {
        // console.log('%%%%%%%%%%%%%%%%%%')
        const data = await albumService.getAllAlbum();
        console.log('data ------>>>', data)
        res.status(200).json(data);
    }   catch (err) {
        next(err);
    }
};

albumController.createAlbum = async (req, res, next) => {
    try {
        // console.log('%%%%%%%%%%%%%%%%%%')
        const data = req.body;
        const buildAlbum = await adminService.createAlbum(data);
        
        res.status(201).json(data);
    }   catch (err) {
        next(err);
    }
};

albumController.selectAlbum = async (req, res, next) => {
    try {
        // console.log('%%%%%%%%%%%%%%%%%%')
        const id = +req.params.albumId
        const existAlbum = await userService.selectAlbum(id);
        if (!existAlbum) {
            createError({
                message: 'Not found album.'
            });
        }
        res.status(200).json(existAlbum);

    }   catch (err) {
        next(err);
    }
};

albumController.addSong = async (req, res, next) => {
    try {
        // console.log('%%%%%%%%%%%%%%%%%% album-controller ---->>')
        // const id = +req.params.albumId;
        const data = req.body;
        data.album_id = +req.params.albumId
        console.log('params ----->>>>', typeof req.params)
        console.log('data ----->>>>', data)
        const newSong = await adminService.addSong(data);

        res.status(201).json(data);
    }   catch (err) {
        next(err);
    }
};

albumController.getAllSong = async (req, res, next) => {
    try {
        const albumId = +req.params.albumId
        const existSong = await albumService.getAllSong(albumId);
        console.log('data ----->>>', albumId, existSong);
        if (!existSong) {
            createError({
                message: 'Not have list song.'
            });
        }
        res.status(200).json(existSong);

    }   catch (err) {
        next(err);
    }
};

module.exports = albumController;