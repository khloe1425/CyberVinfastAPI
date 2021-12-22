const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/admin/categoryControllers');
const {
    createPost,
    getAllPosts,
    getPost,
    updatePost,
    deletePost,
} = require('../controllers/admin/postControllers');
const {
    createShowroom,
    getAllShowrooms,
    getShowroom,
    updateShowroom,
    deleteShowroom,
} = require('../controllers/admin/showroomControllers');
const {
    createCar,
    getAllCars,
    getCar,
    addImage,
} = require('../controllers/admin/carControllers');



// Category
router
    .route('/category')
    .post(protect, admin, createCategory)
    .get(getAllCategories)

router
    .route('/category/:id')
    .get(getCategory)
    .put(protect, admin, updateCategory)
    .delete(protect, admin, deleteCategory)


// Showroom
router
    .route('/showroom')
    .post(protect, admin, createShowroom)
    .get(getAllShowrooms)

router
    .route('/showroom/:id')
    .get(getShowroom)
    .put(protect, admin, updateShowroom)
    .delete(protect, admin, deleteShowroom)

// Car
router
    .route('/car')
    .post(protect, admin, createCar)
    .get(getAllCars)

router
    .route('/car/:id')
    .get(getCar)

router
    .route('/car/:id/image')
    .post(protect, admin, addImage)


// Post
router
    .route('/post')
    .post(protect, admin, createPost)
    .get(getAllPosts)

router
    .route('/post/:id')
    .get(getPost)
    .put(protect, admin, updatePost)
    .delete(protect, admin, deletePost)

module.exports = router;