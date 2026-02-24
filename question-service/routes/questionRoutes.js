const express = require('express');
const router = express.Router();

const { getAllQuestions, addQuestion, updateQuestion } = require('../controllers/questionController');

router.route('/').get(getAllQuestions)
router.route('/').post(addQuestion)
router.route('/:id').put(updateQuestion)

module.exports = router;