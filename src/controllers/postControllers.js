const { Op } = require('sequelize');
const { Post } = require('../sequelize');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Create Post
// @route   POST /api/post
// @access  Private/Admin
exports.createPost = asyncHandler(async (req, res, next) => {
    const post = await Post.create({ ...req.body });

    res.status(200).json({ success: true, data: post });
});

// @desc    Get All Post
// @route   GET /api/post
// @access  Public
exports.getAllPosts = asyncHandler(async (req, res, next) => {
    const posts = await Post.findAll();

    res.status(200).json({ success: true, data: posts });
});

// @desc    Get Post By Id
// @route   GET /api/post/:id
// @access  Public
exports.getPost = asyncHandler(async (req, res, next) => {
    const post = await Post.findByPk(req.params.id);

    res.status(200).json({ success: true, data: post });
});

// @desc    Update Post By Id
// @route   PUT /api/post/:id
// @access  Private/Admin
exports.updatePost = asyncHandler(async (req, res, next) => {
    await Post.update(req.body, {
        where: { id: req.params.id },
    });

    const post = await Post.findByPk(req.params.id);

    res.status(200).json({ success: true, data: post });
});

// @desc    Delete Post By Id
// @route   DELETE /api/post/:id
// @access  Private/Admin
exports.deletePost = asyncHandler(async (req, res, next) => {
    await Post.destroy({
        where: { id: req.params.id },
    });

    res.status(200).json({ success: true, data: {} });
});