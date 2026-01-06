export default function StatCard({ title, value, hint }) {
  return (
    <div className="stat-card">
      <h4>{title}</h4>
      <p className="stat-value">{value}</p>
      {hint && <span className="stat-hint">{hint}</span>}
    </div>
  );
}
