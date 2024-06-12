const prisma = require('../models/prisma');

const adminService = {};

adminService.createAlbum = (data) => prisma.album.create({ data });

module.exports = adminService