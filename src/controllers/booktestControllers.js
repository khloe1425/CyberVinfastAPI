const { Op } = require('sequelize');
const { 
    Booktest,
    Car,
    User,
    Showroom,
} = require('../sequelize');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Book Test Drive Car
// @route   POST /api/booktest
// @access  Private
exports.bookTestCar = asyncHandler(async (req, res, next) => {
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

    const booktest = await Booktest.create({ 
        ...req.body,
        user_id: req.user.id,
        car_id: req.body.car_id,
        showroom_id: req.body.showroom_id
    });

    res.status(200).json({ success: true, data: booktest });
});

// @desc    Get all book tests
// @route   GET /api/booktest
// @access  Private/Admin
exports.getAllBookTests = asyncHandler(async (req, res, next) => {
    const booktests = await Booktest.findAll();

    res.status(200).json({ success: true, data: booktests });
});

// @desc    Get Detail Book test
// @route   POST /api/booktest/:id
// @access  Private
exports.getDetailBookTest = asyncHandler(async (req, res, next) => {
    const booktest = await Booktest.findByPk(req.params.id, {
        include: [
            {
                model: User,
                attributes: ["id", "username", "avatar"],
            }
        ]
    });

    res.status(200).json({ success: true, data: booktest });
});

// @desc    Marked Book Expired
// @route   PUT /api/booktest/:id/expired
// @access  Private/Admin
exports.markBookExpired = asyncHandler(async (req, res, next) => {
    const booktest = await Booktest.findByPk(req.params.id);

    if (!booktest) {
        return next({
            message: `No car found for ID - ${req.params.id}`,
            statusCode: 404,
        });
    }

    booktest.status = "expired";
    await booktest.save();

    res.json({ success: true, data: { booktest }});
});
 