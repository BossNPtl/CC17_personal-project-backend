const prisma = require('../models/prisma');

const albumService = {};

albumService.getAllAlbum = () => prisma.album.findMany({
    select: { id: true, picture_album: true }
});

albumService.getAllSong = (albumId) => prisma.list_song.findMany({
    where: { album_id: albumId},
});

module.exports = albumService;