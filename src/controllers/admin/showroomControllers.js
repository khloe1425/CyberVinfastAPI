const { Op } = require('sequelize');
const { Showroom } = require('../../sequelize');
const asyncHandler = require('../../middleware/asyncHandler');

exports.createShowroom = asyncHandler(async (req, res, next) => {
    const showroom = await Showroom.create({ ...req.body });

    res.status(200).json({ success: true, data: showroom });
});

exports.getAllShowrooms = asyncHandler(async (req, res, next) => {
    const showrooms = await Showroom.findAll();

    res.status(200).json({ success: true, data: showrooms });
});

exports.getShowroom = asyncHandler(async (req, res, next) => {
    const showroom = await Showroom.findByPk(req.params.id);

    res.status(200).json({ success: true, data: showroom });
});

exports.updateShowroom = asyncHandler(async (req, res, next) => {
    await Showroom.update(req.body, {
        where: { id: req.params.id },
    });

    const showroom = await Showroom.findByPk(req.params.id);

    res.status(200).json({ success: true, data: showroom });
});

exports.deleteShowroom = asyncHandler(async (req, res, next) => {
    await Showroom.destroy({
        where: { id: req.params.id },
    });

    res.status(200).json({ success: true, data: {} });
});