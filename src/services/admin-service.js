const prisma = require('../models/prisma');

const adminService = {};

adminService.createAlbum = (data) => prisma.album.create({ data });

adminService.addSong = (data) => prisma.list_song.create({
    data
});

module.exports = adminService;