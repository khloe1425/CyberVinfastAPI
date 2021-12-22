const { Op } = require('sequelize');
const { Category } = require('../sequelize');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Create Category
// @route   POST /api/category
// @access  Private/Admin
exports.createCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.create({ ...req.body });

    res.status(200).json({ success: true, data: category });
});

// @desc    Get All Category
// @route   GET /api/category
// @access  Public
exports.getAllCategories = asyncHandler(async (req, res, next) => {
    const categories = await Category.findAll();

    res.status(200).json({ success: true, data: categories });
});

// @desc    Get Category By Id
// @route   GET /api/category/:id
// @access  Public
exports.getCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findByPk(req.params.id);

    res.status(200).json({ success: true, data: category });
});

// @desc    Update Category By Id
// @route   PUT /api/category/:id
// @access  Private/Admin
exports.updateCategory = asyncHandler(async (req, res, next) => {
    await Category.update(req.body, {
        where: { id: req.params.id },
    });

    const category = await Category.findByPk(req.params.id);

    res.status(200).json({ success: true, data: category });
});

// @desc    Delete Category By Id
// @route   DELETE /api/category/:id
// @access  Private/Admin
exports.deleteCategory = asyncHandler(async (req, res, next) => {
    await Category.destroy({
        where: { id: req.params.id },
    });

    res.status(200).json({ success: true, data: {} });
});