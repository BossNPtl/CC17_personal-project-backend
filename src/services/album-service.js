const prisma = require('../models/prisma');

const albumService = {};

albumService.getAllAlbum = () => prisma.album.findMany({
    select: { id: true, picture_album: true }
});

module.exports = albumService;