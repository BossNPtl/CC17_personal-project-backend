const prisma = require('../models/prisma');

const commentService = {};

commentService.postComment = (data) => prisma.comment.create({ data });

commentService.getAllComment = (albumId) => prisma.comment.findMany({
    where: { album_id: albumId, deletedAt: null },
    include: { user: true },
    orderBy: { id: 'desc' }
});

// commentService.getAllComment = (albumId) => prisma.comment.findMany({
//     where: { album_id: albumId, deletedAt: null },
//     orderBy: { id: 'desc' }
// });

commentService.patchComment = (id, data) => prisma.comment.update({
    where: { id: id }, 
    data: { message: data }
});

commentService.deleteComment = (id) => prisma.comment.update({
    where: { id: id }, 
    data: { deletedAt: new Date() }
});

module.exports = commentService;