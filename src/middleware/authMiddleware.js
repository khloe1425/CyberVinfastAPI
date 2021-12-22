const jwt = require('jsonwebtoken');
const { User } = require('../sequelize');

exports.protect = async (req, res, next) => {
    if (!req.headers.authorization) {
        return next({
            message: "You need to be logged in to visit this route",
            statusCode: 401,
        });
    }

    const token = req.headers.authorization.replace("Bearer", "").trim();

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({
            attributes: [
                "id",
                "firstName",
                "lastName",
                "username",
                "email",
                "avatar",
                "isAdmin",
            ],
            where: {
                id: decoded.id,
            }
        });

        req.user = user;
        next();
    } catch (error) {
        next({
            message: "Something is wrong",
            statusCode: 500,
        });
    }
};

exports.admin = async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return next({
            message: "Authorization denied, only admins can visit this route",
            statusCode: 401,
        });
    }
};