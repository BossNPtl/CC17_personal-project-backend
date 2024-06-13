const adminService = require("../services/admin-service");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");

const albumController = {};

albumController.createAlbum = async (req, res, next) => {
    try {
        // console.log('%%%%%%%%%%%%%%%%%%')
        const data = req.body;
        const buildAlbum = await adminService.createAlbum(data);
        
        res.status(201).json({ buildAlbum });
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
                message: 'Not found album'
            });
        }
        res.status(200).json({ existAlbum });

    }   catch (err) {
        next(err);
    }
};

albumController.addSong = async (req, res, next) => {
    try {
        console.log('%%%%%%%%%%%%%%%%%% album-controller ---->>')
        // const id = +req.params.albumId;
        const data = req.body;
        data.album_id = +req.params.albumId
        console.log('params ----->>>>', typeof req.params)
        console.log('data ----->>>>', data)
        const newSong = await adminService.addSong(data);

        res.status(201).json({ newSong });
    }   catch (err) {
        next(err);
    }
};

module.exports = albumController;