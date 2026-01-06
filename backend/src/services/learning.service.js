const { db } = require("../config/firebase");

exports.getNextQuestion = async (req, res) => {
  try {
    const snap = await db.collection("questions").limit(1).get();

    if (snap.empty) {
      return res.json({ completed: true });
    }

    const doc = snap.docs[0];
    res.json({ id: doc.id, ...doc.data() });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
