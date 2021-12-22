const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const CategoryCtrl = require('../controllers/categoryControllers');

// Category
router
    .route('/')
    .post(protect, admin, CategoryCtrl.createCategory)
    .get(CategoryCtrl.getAllCategories)

router
    .route('/:id')
    .get(CategoryCtrl.getCategory)
    .put(protect, admin, CategoryCtrl.updateCategory)
    .delete(protect, admin, CategoryCtrl.deleteCategory)

module.exports = router;