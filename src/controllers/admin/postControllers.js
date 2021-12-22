const { Op } = require('sequelize');
const { Post } = require('../../sequelize');
const asyncHandler = require('../../middleware/asyncHandler');

exports.createPost = asyncHandler(async (req, res, next) => {
    const post = await Post.create({ ...req.body });

    res.status(200).json({ success: true, data: post });
});

exports.getAllPosts = asyncHandler(async (req, res, next) => {
    const posts = await Post.findAll();

    res.status(200).json({ success: true, data: posts });
});

exports.getPost = asyncHandler(async (req, res, next) => {
    const post = await Post.findByPk(req.params.id);

    res.status(200).json({ success: true, data: post });
});

exports.updatePost = asyncHandler(async (req, res, next) => {
    await Post.update(req.body, {
        where: { id: req.params.id },
    });

    const post = await Post.findByPk(req.params.id);

    res.status(200).json({ success: true, data: post });
});

exports.deletePost = asyncHandler(async (req, res, next) => {
    await Post.destroy({
        where: { id: req.params.id },
    });

    res.status(200).json({ success: true, data: {} });
});