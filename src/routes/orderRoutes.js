const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const OrderCtrl = require('../controllers/orderControllers');

router
    .route('/')
    .post(OrderCtrl.createOrder)
    .get(protect, admin, OrderCtrl.getAllOrders)


router
    .route('/:id')
    .get(protect, OrderCtrl.getDetailOrder)

module.exports = router;