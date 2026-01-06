const express = require("express");
const cors = require("cors");
const rateLimit = require("./middleware/rateLimit");

const app = express();
app.use(cors());
app.use(express.json());
app.use(rateLimit);

app.use("/api/questions", require("./routes/question.routes"));
app.use("/api/progress", require("./routes/progress.routes"));
app.use("/api/learn", require("./routes/learn.routes"));
app.use("/api/analytics", require("./routes/analytics.routes"));

app.get("/", (_, res) => res.send("Backend running"));

module.exports = app;
