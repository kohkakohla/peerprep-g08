const Question = require('../models/questionModel');

// @desc    Get all questions
// @route   GET /api/questions
// @access  Public  
const getAllQuestions = async (req, res) => {
    const questions = await Question.find({})
    res.status(200).json(questions)
}

const addQuestion = async (req, res) => {
    const { title, question, answer, difficulty, category, tags, examples } = req.body

    if (!title || !question || !answer || !difficulty || !category) {
        res.status(400).json({ message: 'Please provide all required fields' })
        return
    }   

    try {
        const newQuestion = await Question.create({
            title,
            question,
            answer,
            difficulty,
            category,
            tags,
            examples,
        })
        res.status(201).json(newQuestion)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }   
}   


module.exports = {
    getAllQuestions,
    addQuestion,
}