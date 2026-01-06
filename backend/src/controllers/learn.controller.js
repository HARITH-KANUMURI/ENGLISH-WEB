const { db } = require("../config/firebase");
const { getQuestionsCache } = require("../services/cache.service");

exports.getNext = async (req, res) => {
  const userId = req.headers["x-user-id"];
  const stateRef = db.collection("learning_state").doc(userId);

  const stateSnap = await stateRef.get();
  const index = stateSnap.exists ? stateSnap.data().index : 0;

  const questions = await getQuestionsCache();

  if (index >= questions.length) {
    return res.json({ completed: true });
  }

  await stateRef.set({ index: index + 1 });
  res.json(questions[index]);
};
