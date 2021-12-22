const { Op } = require('sequelize');
const { 
    Order,
    Car,
    User,
    Showroom,
} = require('../sequelize');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Order Car
// @route   POST /api/order
// @access  Private
exports.createOrder = asyncHandler(async (req, res, next) => {
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

    const order = await Order.create({ 
        ...req.body,
        user_id: req.user.id,
        car_id: req.body.car_id,
        showroom_id: req.body.showroom_id
    });

    res.status(200).json({ success: true, data: order });
});

// @desc    Get all orders
// @route   GET /api/order
// @access  Private/Admin
exports.getAllOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.findAll();

    res.status(200).json({ success: true, data: orders });
});

// @desc    Get Detail Order
// @route   POST /api/order/:id
// @access  Private
exports.getDetailOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findByPk(req.params.id, {
        include: [
            {
                model: User,
                attributes: ["id", "username", "avatar"],
            }
        ]
    });

    res.status(200).json({ success: true, data: order });
});
 