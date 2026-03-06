import concepts from "../data/concepts";

export default function Concepts({ selectedTopic }) {
  if (!selectedTopic || selectedTopic === "random") {
    return (
      <div className="blank-page">
        <h2>Select a topic from the sidebar</h2>
        <p>Concept explanations are available topic-wise.</p>
      </div>
    );
  }

  const content = concepts[selectedTopic];

  if (!content) {
    return (
      <div className="blank-page">
        <h2>Content coming soon</h2>
        <p>This topic will be updated shortly.</p>
      </div>
    );
  }

  return (
    <div className="concept-page">
      <h2>{selectedTopic.replace(/-/g, " ")}</h2>

      <pre className="concept-content">
        {content}
      </pre>
    </div>
  );
}
