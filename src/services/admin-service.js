const prisma = require('../models/prisma');

const adminService = {};

adminService.createAlbum = (data) => prisma.album.create({ data });

adminService.addSong = (data) => prisma.list_song.create({
    data
});

adminService.deleteAlbum = (id) => prisma.album.update({
    where: { id: id },
    data: { deletedAt: new Date() }
});

adminService.editSong = (songId, data) => prisma.list_song.update({
    where: { id: songId },
    data: data
})

module.exports = adminService;