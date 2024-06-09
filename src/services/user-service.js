const prisma = require('../models/prisma');

const userService = {};

userService.createUser = data => prisma.user.create({ data });

userService.findEmail = email => prisma.user.findFirst({
    where: { email: email }
});

module.exports = userService;