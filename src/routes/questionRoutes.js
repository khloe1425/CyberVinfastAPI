const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const QuestionCtrl = require('../controllers/questionControllers');

router
    .route('/')
    .post(QuestionCtrl.createQuestion)
    .get(protect, admin, QuestionCtrl.getAllQuestions)


router
    .route('/:id')
    .get(protect, QuestionCtrl.getDetailQuestion)

module.exports = router;