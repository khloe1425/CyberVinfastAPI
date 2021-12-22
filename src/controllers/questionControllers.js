const { Op } = require('sequelize');
const { 
    Question,
    Car,
    User,
} = require('../sequelize');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Create Question 
// @route   POST /api/question
// @access  Private
exports.createQuestion = asyncHandler(async (req, res, next) => {
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

    const question = await Question.create({ 
        ...req.body,
        user_id: req.user.id,
        car_id: req.body.car_id,
    });

    res.status(200).json({ success: true, data: question });
});

// @desc    Get all questions
// @route   GET /api/question
// @access  Private/Admin
exports.getAllQuestions = asyncHandler(async (req, res, next) => {
    const questions = await Question.findAll();

    res.status(200).json({ success: true, data: questions });
});

// @desc    Get Detail Question
// @route   POST /api/question/:id
// @access  Private
exports.getDetailQuestion = asyncHandler(async (req, res, next) => {
    const question = await Question.findByPk(req.params.id, {
        include: [
            {
                model: User,
                attributes: ["id", "username", "avatar"],
            }
        ]
    });

    res.status(200).json({ success: true, data: question });
});
 