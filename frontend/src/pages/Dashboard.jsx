import { useAuth } from "../auth/AuthContext";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const { user } = useAuth();

  const data = JSON.parse(
    localStorage.getItem("learnova-dashboard") || "{}"
  );

  const attempts = data.attempts || 0;
  const accuracy = data.accuracy || 0;
  const topics = data.topics || {};

  const level =
    accuracy >= 85
      ? "Advanced"
      : accuracy >= 60
      ? "Intermediate"
      : "Beginner";

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p className="dashboard-email">{user.email}</p>
      </div>

      {/* Summary */}
      <div className="dashboard-stats">
        <StatCard title="Attempts" value={attempts} />
        <StatCard title="Accuracy" value={`${accuracy}%`} />
        <StatCard title="Level" value={level} />
      </div>

      {/* Progress Chart */}
      <h3 className="section-title">Progress by Topic</h3>
      <div className="progress-chart">
        {Object.keys(topics).length === 0 && (
          <p className="muted">No data yet</p>
        )}

        {Object.entries(topics).map(([topic, t]) => {
          const percent = Math.round(
            (t.correct / t.total) * 100 || 0
          );

          return (
            <div key={topic} className="progress-row">
              <span>{topic.replace(/-/g, " ")}</span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span>{percent}%</span>
            </div>
          );
        })}
      </div>

      {/* Topic Table */}
      <h3 className="section-title">Topic Statistics</h3>
      <div className="topic-table">
        <div className="table-header">
          <span>Topic</span>
          <span>Attempts</span>
          <span>Accuracy</span>
        </div>

        {Object.entries(topics).map(([topic, t]) => {
          const percent = Math.round(
            (t.correct / t.total) * 100 || 0
          );

          return (
            <div key={topic} className="table-row">
              <span>{topic.replace(/-/g, " ")}</span>
              <span>{t.attempts}</span>
              <span>{percent}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
