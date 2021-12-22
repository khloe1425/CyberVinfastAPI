const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const ShowroomCtrl = require('../controllers/showroomControllers');

// Showroom
router
    .route('/')
    .post(protect, admin, ShowroomCtrl.createShowroom)
    .get(ShowroomCtrl.getAllShowrooms)

router
    .route('/:id')
    .get(ShowroomCtrl.getShowroom)
    .put(protect, admin, ShowroomCtrl.updateShowroom)
    .delete(protect, admin, ShowroomCtrl.deleteShowroom)

module.exports = router;