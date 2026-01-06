const express = require("express");
const router = express.Router();

const validateRequest = require("../middleware/validateRequest");
const { submit } = require("../controllers/progress.controller");

/**
 * /api/progress/submit
 */
router.post(
  "/submit",
  validateRequest(["questionId", "selectedAnswer", "correctAnswer", "topic"]),
  submit
);

module.exports = router;
