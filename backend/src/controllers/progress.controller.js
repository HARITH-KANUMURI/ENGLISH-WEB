const { db } = require("../config/firebase");
const { getUserId } = require("../utils/user");

/**
 * POST /api/progress/submit
 */
exports.submit = async (req, res) => {
  try {
    const userId = getUserId(req);

    const { questionId, selectedAnswer, correctAnswer, topic } = req.body;

    const isCorrect = selectedAnswer === correctAnswer;

    await db.collection("progress").add({
      userId,
      questionId,
      selectedAnswer,
      correctAnswer,
      isCorrect,
      topic,
      createdAt: new Date(),
    });

    res.json({ isCorrect });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
