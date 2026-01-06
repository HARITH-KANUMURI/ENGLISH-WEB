import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    navigate("/dashboard");
    return null;
  }

  const { score, total, mode, topic } = state;
  const accuracy = Math.round((score / total) * 100);

  const prev = JSON.parse(
    localStorage.getItem("learnova-dashboard") || "{}"
  );

  const attempts = (prev.attempts || 0) + 1;
  const correct = (prev.correct || 0) + score;
  const questions = (prev.total || 0) + total;

  const topics = prev.topics || {};
  const topicData = topics[topic] || {
    attempts: 0,
    correct: 0,
    total: 0,
  };

  topicData.attempts += 1;
  topicData.correct += score;
  topicData.total += total;

  topics[topic] = topicData;

  const updated = {
    attempts,
    correct,
    total: questions,
    accuracy: Math.round((correct / questions) * 100),
    lastMode: mode,
    topics,
  };

  localStorage.setItem(
    "learnova-dashboard",
    JSON.stringify(updated)
  );

  return (
    <div className="quiz-page">
      <div className="result-card">
        <h2>Result</h2>
        <p>
          Score: <strong>{score}</strong> / {total}
        </p>
        <p>Accuracy: {accuracy}%</p>

        <button onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
