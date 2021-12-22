const { Op } = require('sequelize');
const { 
    Service,
    Car,
    User,
    Showroom,
} = require('../../sequelize');
const asyncHandler = require('../../middleware/asyncHandler');

exports.createService = asyncHandler(async (req, res, next) => {
    const car = await Car.findByPk(req.body.car_id);

    if (!car) {
        return next({
            message: `No car found for ID - ${req.body.car_id}`,
            statusCode: 404,
        });
    }

    const showroom = await Showroom.findByPk(req.body.showroom_id);

    if (!showroom) {
        return next({
            message: `No showroom found for ID - ${req.body.showroom_id}`,
            statusCode: 404,
        });
    }

    if (car.showroom_id !== showroom.id) {
        return next({
            message: `Showroom and car is incompatible`,
            statusCode: 404,
        });
    }

    const service = await Service.create({ 
        ...req.body,
        user_id: req.user.id,
        car_id: req.body.car_id,
        showroom_id: req.body.showroom_id
    });

    res.status(200).json({ success: true, data: service });
});

exports.getAllServices = asyncHandler(async (req, res, next) => {
    const services = await Service.findAll();

    res.status(200).json({ success: true, data: services });
});

exports.getDetailService = asyncHandler(async (req, res, next) => {
    const service = await Service.findByPk(req.params.id, {
        include: [
            {
                model: User,
                attributes: ["id", "username", "avatar"],
            }
        ]
    });

    res.status(200).json({ success: true, data: service });
});
 