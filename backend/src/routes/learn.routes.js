const express = require("express");
const router = express.Router();
const service = require("../services/learning.service");

router.get("/next", service.getNextQuestion);

module.exports = router;
