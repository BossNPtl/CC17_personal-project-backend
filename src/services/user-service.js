const prisma = require('../models/prisma');

const userService = {};

userService.createUser = data => prisma.user.create({ data });

userService.findEmail = email => prisma.user.findFirst({
    where: { email: email }
});

userService.findUserById = id => prisma.user.findFirst({
    where: { id: id }
});

// userService.findNameUser = ( id, newName ) => console.log(id, newName)
userService.findNameUser = ( id, newName ) => 
    prisma.user.update({
    where: { id: id },
    data: { name: newName.name }
});

module.exports = userService;