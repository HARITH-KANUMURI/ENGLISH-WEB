const TOPICS = require("../constants/topics");

exports.validateQuestion = (q) => {
  if (!q.question || typeof q.question !== "string") return false;
  if (!Array.isArray(q.options) || q.options.length !== 4) return false;
  if (!q.options.includes(q.answer)) return false;
  if (!TOPICS.includes(q.topic)) return false;

  return true;
};
