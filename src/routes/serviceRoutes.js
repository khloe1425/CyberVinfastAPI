const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const ServiceCtrl = require('../controllers/serviceControllers');

router
    .route('/')
    .post(ServiceCtrl.createService)
    .get(protect, admin, ServiceCtrl.getAllServices)


router
    .route('/:id')
    .get(protect, ServiceCtrl.getDetailService)

module.exports = router;