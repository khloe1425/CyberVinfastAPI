const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const PostCtrl = require('../controllers/postControllers');

// Post
router
    .route('/')
    .post(protect, admin, PostCtrl.createPost)
    .get(PostCtrl.getAllPosts)

router
    .route('/:id')
    .get(PostCtrl.getPost)
    .put(protect, admin, PostCtrl.updatePost)
    .delete(protect, admin, PostCtrl.deletePost)

module.exports = router;