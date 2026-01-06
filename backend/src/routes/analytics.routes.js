const express = require("express");
const router = express.Router();
const { db } = require("../config/firebase");

router.get("/user/:userId", async (req, res) => {
  try {
    const snap = await db
      .collection("progress")
      .where("userId", "==", req.params.userId)
      .get();

    const total = snap.size;
    const correct = snap.docs.filter((d) => d.data().isCorrect).length;

    res.json({
      userId: req.params.userId,
      totalAttempts: total,
      correctAnswers: correct,
      accuracy: total ? Math.round((correct / total) * 100) : 0,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
