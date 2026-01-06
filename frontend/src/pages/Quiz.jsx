import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();

  /* ---------------- SAFE STATE EXTRACTION ---------------- */

  const mode = location.state?.mode ?? "practice";
  const topic =
    location.state && "topic" in location.state
      ? location.state.topic
      : "random";

  const QUESTION_LIMIT =
    mode === "assignment" ? 30 : 20;

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH QUESTIONS ---------------- */

  useEffect(() => {
    let isMounted = true;

    async function fetchQuestions() {
      setLoading(true);

      try {
        const endpoint =
          topic === "random"
            ? `/questions/random?limit=${QUESTION_LIMIT}`
            : `/questions/topic/${topic}?limit=${QUESTION_LIMIT}`;

        const res = await api.get(endpoint);

        if (isMounted) {
          setQuestions(Array.isArray(res.data) ? res.data : []);
        }
      } catch (err) {
        console.error("Quiz fetch error:", err);
        if (isMounted) setQuestions([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchQuestions();

    return () => {
      isMounted = false;
    };
  }, [topic, mode]);

  /* ---------------- KEYBOARD SUPPORT ---------------- */

  useEffect(() => {
    function handleKey(e) {
      const key = e.key.toLowerCase();
      const map = {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
        1: 0,
        2: 1,
        3: 2,
        4: 3,
      };

      if (map[key] !== undefined) {
        selectOption(map[key]);
      }
    }

    window.addEventListener("keydown", handleKey);
    return () =>
      window.removeEventListener("keydown", handleKey);
  }, [current, questions, answers]);

  /* ---------------- HELPERS ---------------- */

  function selectOption(index) {
    const q = questions[current];
    if (!q || !q.options[index]) return;

    setAnswers((prev) => ({
      ...prev,
      [q.id]: q.options[index],
    }));
  }

  function nextQuestion() {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
    }
  }

  function submitQuiz() {
    let score = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.answer) {
        score++;
      }
    });

    navigate("/result", {
      state: {
        score,
        total: questions.length,
        topic,
        mode,
      },
    });
  }

  /* ---------------- UI ---------------- */

  if (loading) {
    return <div className="quiz-loading">Loading…</div>;
  }

  if (!questions.length) {
    return (
      <div className="quiz-loading">
        No questions found
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="quiz-page">
      <div className="quiz-card">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        {topic !== "random" && (
          <div className="quiz-topic">
            Topic: {topic.replace(/-/g, " ")}
          </div>
        )}

        <div className="question-text">
          {current + 1}. {q.question}
        </div>

        <div className="options">
          {q.options.map((opt, i) => (
            <label key={i} className="option">
              <input
                type="radio"
                checked={answers[q.id] === opt}
                onChange={() => selectOption(i)}
              />
              {opt}
            </label>
          ))}
        </div>

        <div className="quiz-actions">
          {current < questions.length - 1 ? (
            <button onClick={nextQuestion}>
              Next
            </button>
          ) : (
            <button onClick={submitQuiz}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
