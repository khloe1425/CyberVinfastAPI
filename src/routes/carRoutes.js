const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const CarCtrl = require('../controllers/carControllers');

// Car
router
    .route('/')
    .post(CarCtrl.createCar)
    .get(CarCtrl.getAllCars)

router
    .route('/compare')
    .post(CarCtrl.compareCar)

router
    .route('/:id')
    .get(CarCtrl.getCar)

router
    .route('/:id/image')
    .post(protect, admin, CarCtrl.addImage)

router
    .route('/:id/fee')
    .get(CarCtrl.getFeeCar)

module.exports = router;