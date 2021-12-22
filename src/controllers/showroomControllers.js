const { Op } = require('sequelize');
const { Showroom } = require('../sequelize');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Create Showroom
// @route   POST /api/showroom
// @access  Private/Admin
exports.createShowroom = asyncHandler(async (req, res, next) => {
    const showroom = await Showroom.create({ ...req.body });

    res.status(200).json({ success: true, data: showroom });
});

// @desc    Get All Showroom
// @route   GET /api/showroom
// @access  Public
exports.getAllShowrooms = asyncHandler(async (req, res, next) => {
    const showrooms = await Showroom.findAll();

    res.status(200).json({ success: true, data: showrooms });
});

// @desc    Get Showroom By Id
// @route   GET /api/showroom/:id
// @access  Public
exports.getShowroom = asyncHandler(async (req, res, next) => {
    const showroom = await Showroom.findByPk(req.params.id);

    res.status(200).json({ success: true, data: showroom });
});

// @desc    Update Showroom By Id
// @route   PUT /api/showroom/:id
// @access  Private/Admin
exports.updateShowroom = asyncHandler(async (req, res, next) => {
    await Showroom.update(req.body, {
        where: { id: req.params.id },
    });

    const showroom = await Showroom.findByPk(req.params.id);

    res.status(200).json({ success: true, data: showroom });
});

// @desc    Delete Showroom By Id
// @route   DELETE /api/showroom/:id
// @access  Private/Admin
exports.deleteShowroom = asyncHandler(async (req, res, next) => {
    await Showroom.destroy({
        where: { id: req.params.id },
    });

    res.status(200).json({ success: true, data: {} });
});