const express = require("express");
const router = express.Router();

const {
  getRandomQuestions,
  getQuestionsByTopic,
  getPaginatedQuestions,
} = require("../controllers/question.controller");

/**
 * Random questions
 * GET /api/questions/random
 */
router.get("/random", getRandomQuestions);

/**
 * Topic-based questions
 * GET /api/questions/topic/:topic
 */
router.get("/topic/:topic", getQuestionsByTopic);

/**
 * Paginated questions (admin / debug)
 * GET /api/questions/paginated
 */
router.get("/paginated", getPaginatedQuestions);

module.exports = router;
