const prisma = require('../models/prisma');

const commentService = {};

commentService.postComment = (data) => prisma.comment.create({ data });

commentService.getAllComment = (albumId) => prisma.comment.findMany({
    where: { album_id: albumId, deletedAt: null }
});

commentService.patchComment = (id, data) => prisma.comment.update({
    where: { id: id }, 
    data: { message: data.message }
});

commentService.deleteComment = (id) => prisma.comment.update({
    where: { id: id }, 
    data: { deletedAt: new Date() }
});

module.exports = commentService;