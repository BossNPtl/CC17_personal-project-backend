const hashService = require('../services/hash-service');
const jwtService = require('../services/jwt-service');
const userService = require('../services/user-service');
const createError = require('../utils/create-error');

const authController = {};

authController.register = async (req, res, next) => {
    try {
        console.log('%%%%%%%%%%%%%%%%%%')
        const data = req.input;
        // const data = req.body;
        const existEmail = await userService.findEmail(data.email);
        if (existEmail) {
            createError({
                message: 'email already used!',
                statusCode: 400
            });
        }
        console.log('$$$$$$$$$$$$$$$$$$$')
        data.password = await hashService.hash(data.password);
        await userService.createUser(data);
        res.status(201).json({ message: 'user created' });

    } catch (err) {
        next(err)
    }
};

authController.login = async (req, res, next) => {
    try {
        console.log('%%%%%%%%%%%%%%%%%%')
        const existUser = await userService.findEmail(req.input.email);
        if (!existUser) {
            createError({
                message: 'invalid user',
                statusCode: 400
            });
        }
        console.log('$$$$$$$$$$$$$$$$$$$')
        const truePassword = await hashService.compare(
            req.input.password, existUser.password
        );

        if (!truePassword) {
            createError({
                message: 'invalid password',
                statusCode: 400
            });
        }

        // res.status(200).json({ message: 'login success' })
        const accessToken = jwtService.create({ id: existUser.id });
        res.status(200).json({ message: 'login success', accessToken })

    } catch (err) {
        next(err)
    }
};

authController.getMe = (req, res, next) => {
    res.status(200).json({ user: req.user });
};

module.exports = authController;