const { getQuestionsCache } = require("../services/cache.service");
const { shuffle } = require("../services/shuffle.service");

/**
 * GET /api/questions/random?limit=NUMBER
 */
exports.getRandomQuestions = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const data = await getQuestionsCache();

    const shuffled = shuffle(data);
    res.json(shuffled.slice(0, limit));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/questions/topic/:topic?limit=NUMBER
 */
exports.getQuestionsByTopic = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const topic = req.params.topic;

    const data = await getQuestionsCache();
    const filtered = data.filter((q) => q.topic === topic);

    const shuffled = shuffle(filtered);
    res.json(shuffled.slice(0, limit));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/questions/paginated?page=1&limit=20
 */
exports.getPaginatedQuestions = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);

    const data = await getQuestionsCache();

    const total = data.length;
    const start = (page - 1) * limit;
    const end = start + limit;

    const slice = data.slice(start, end);

    res.json({
      page,
      limit,
      total,
      data: slice,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
