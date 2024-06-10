const createError = require('../utils/create-error');
const jwtService = require('../services/jwt-service');
const userService = require('../services/user-service');

const authenticate = async (req, res, next) => {
    try {
        const userLogin = req.headers.authorization;
        if (!userLogin || !userLogin.startWith('Bearer ')) {
            createError({
                message: 'unauthenticated',
                statusCode: 401
            });
        }

        const accessToken = userLogin.split(' ')[1];
        const payload = jwtService.check(accessToken);

        const user = await userService.findUserById(payload.id);
        if (!user) {
            createError({
                message: 'user was not found',
                statusCode: 400
            });
        }
        
        // delete user.password;

        req.user = user;
        next();
        
    }   catch (err) {
        next(err);
    }
};

module.exports = authenticate;