const { Op } = require('sequelize');
const { Category } = require('../../sequelize');
const asyncHandler = require('../../middleware/asyncHandler');

exports.createCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.create({ ...req.body });

    res.status(200).json({ success: true, data: category });
});

exports.getAllCategories = asyncHandler(async (req, res, next) => {
    const categories = await Category.findAll();

    res.status(200).json({ success: true, data: categories });
});

exports.getCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findByPk(req.params.id);

    res.status(200).json({ success: true, data: category });
});

exports.updateCategory = asyncHandler(async (req, res, next) => {
    await Category.update(req.body, {
        where: { id: req.params.id },
    });

    const category = await Category.findByPk(req.params.id);

    res.status(200).json({ success: true, data: category });
});

exports.deleteCategory = asyncHandler(async (req, res, next) => {
    await Category.destroy({
        where: { id: req.params.id },
    });

    res.status(200).json({ success: true, data: {} });
});