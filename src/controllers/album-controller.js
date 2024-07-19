const fs = require("fs");

const adminService = require("../services/admin-service");
const albumService = require("../services/album-service");
const uploadService = require("../services/upload-service");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");

const albumController = {};

albumController.getAllAlbum = async (req, res, next) => {
    try {
        const data = await albumService.getAllAlbum();
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

albumController.createAlbum = async (req, res, next) => {
    try {
        const data = req.body;
        const {
            picture_album,
            picture_band,
        } = req.files;
        console.log('data --->>', data);
        console.log('file --->>', picture_album, picture_band);
        console.log('req.file --->>', req.files);

        const uploadFile = async (file) => {
            const filePath = file.path;
            const cloudinaryUrl = await uploadService.upload(filePath);
            fs.unlink(filePath, (error) => {
                if (error) {
                    console.error("Error deleting file: ", filePath, error);
                }
            }
            );  // Delete the local file
            return cloudinaryUrl;
        };

        const [picture_albumUrl, picture_bandUrl] = await Promise.all([uploadFile(picture_album[0]), uploadFile(picture_band[0])]);
        console.log('check --->', picture_album[0], picture_band[0]);
        data.picture_album = picture_albumUrl
        data.picture_band = picture_bandUrl

        const buildAlbum = await adminService.createAlbum(data);

        res.status(201).json({ album: buildAlbum });
    } catch (err) {
        console.log(err)
        next(err);
    }
};

albumController.selectAlbum = async (req, res, next) => {
    try {
        const id = +req.params.albumId
        const existAlbum = await userService.selectAlbum(id);
        if (!existAlbum) {
            createError({
                message: 'Not found album.'
            });
        }
        res.status(200).json(existAlbum);

    } catch (err) {
        next(err);
    }
};

albumController.addSong = async (req, res, next) => {
    try {
        const data = req.body;
        data.album_id = +req.params.albumId
        const newSong = await adminService.addSong(data);

        res.status(201).json(newSong);
    } catch (err) {
        next(err);
    }
};

albumController.getAllSong = async (req, res, next) => {
    try {
        const albumId = +req.params.albumId
        const existSong = await albumService.getAllSong(albumId);
        if (!existSong) {
            createError({
                message: 'Not have list song.'
            });
        }
        res.status(200).json(existSong);

    } catch (err) {
        next(err);
    }
};

albumController.editSong = async (req, res, next) => {
    try {
        // console.log("params --->>", req.params);
        // console.log("songId --->>", req.params.songId);
        // console.log("body --->>", req.body);
        const songId = +req.params.songId
        const data = req.body
        const existSong = await adminService.editSong(songId, data);
        if (!existSong) {
            createError({
                message: 'Not have list song.'
            });
        }
        res.status(200).json(existSong);
    } catch (err) {
        console.log(err)
        next(err);
    }
}

albumController.deleteAlbum = async (req, res, next) => {
    try {
        const albumId = +req.params.albumId
        console.log(albumId)
        const album = await adminService.deleteAlbum(albumId);
        res.status(200).json(album);
    } catch (err) {
        next(err);
    }
}

module.exports = albumController;