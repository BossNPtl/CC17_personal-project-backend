const userService = require("../services/user-service");

const userController = {};

userController.rename = async (req, res, next) => {
    try {
        const { id } = req.user;
        const body = req.input;
        
        const userRename = await userService.findNameUser(id, body);
        res.status(200).json({ message: 'Rename success' });
        
    }   catch (err) {
        next(err)
    }
};

module.exports = userController;