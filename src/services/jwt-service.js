const jwt = require('jsonwebtoken');

const jwtService = {};

jwtService.create = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2d' });

jwtService.check = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = jwtService;