const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const BookCtrl = require('../controllers/booktestControllers');

router
    .route('/')
    .post(BookCtrl.bookTestCar)
    .get(protect, admin, BookCtrl.getAllBookTests)


router
    .route('/:id')
    .get(protect, BookCtrl.getDetailBookTest)

router
    .route('/:id/expired')
    .put(protect, admin, BookCtrl.markBookExpired)

module.exports = router;