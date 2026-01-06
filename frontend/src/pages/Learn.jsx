import { useNavigate } from "react-router-dom";

export default function Learn({ selectedTopic }) {
  const navigate = useNavigate();

  const startQuiz = (mode) => {
    navigate("/quiz", {
      state: {
        mode,
        topic: selectedTopic || "random",
      },
    });
  };

  return (
    <div className="content">
      <h2>Practice with Learnova</h2>

      <p style={{ opacity: 0.8, marginBottom: "20px" }}>
        Selected topic:{" "}
        <strong>
          {selectedTopic
            ? selectedTopic.replace(/-/g, " ")
            : "Random"}
        </strong>
      </p>

      <div className="card-grid-3">
        <div className="wide-card">
          <h3>Practice</h3>
          <p>20 / 20 questions</p>
          <button onClick={() => startQuiz("practice")}>
            Start Practice
          </button>
        </div>

        <div className="wide-card">
          <h3>Test</h3>
          <p>20 / 20 questions</p>
          <button onClick={() => startQuiz("test")}>
            Start Test
          </button>
        </div>

        <div className="wide-card">
          <h3>Assignment</h3>
          <p>30 / 30 questions</p>
          <button onClick={() => startQuiz("assignment")}>
            Start Assignment
          </button>
        </div>
      </div>
    </div>
  );
}
