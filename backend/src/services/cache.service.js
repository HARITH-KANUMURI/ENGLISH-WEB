const { db } = require("../config/firebase");

let CACHE = null;
let CACHE_TIME = 0;
const TTL = 5 * 60 * 1000;

exports.getQuestionsCache = async () => {
  const now = Date.now();
  if (CACHE && now - CACHE_TIME < TTL) return CACHE;

  const snap = await db.collection("questions").get();
  CACHE = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  CACHE_TIME = now;
  return CACHE;
};
