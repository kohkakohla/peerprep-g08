const express = require('express');
const router = express.Router();

const { getAllQuestions, addQuestion } = require('../controllers/questionController');

router.route('/').get(getAllQuestions)
router.route('/').post(addQuestion)

module.exports = router;