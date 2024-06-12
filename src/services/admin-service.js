const prisma = require('../models/prisma');

const adminService = {};

adminService.checkAdmin = (id) => prisma.role.findFirst({
    where: { id: id, role: admin },
});

module.exports = adminService