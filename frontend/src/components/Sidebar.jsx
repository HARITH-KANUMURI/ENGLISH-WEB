import { useLocation } from "react-router-dom";

const TOPICS = [
  "random",
  "tenses",
  "conditionals",
  "subject-verb-agreement",
  "conjunctions",
  "determiners",
  "modals",
  "prepositions",
  "pronouns",
  "question-tags",
  "relative-clauses",
  "reported-speech",
  "voice-active-passive",
];

export default function Sidebar({
  selectedTopic,
  setSelectedTopic,
  closeSidebar,
}) {
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";

  return (
    <aside className="sidebar open">
      <h3>{isProfilePage ? "Account" : "Topics"}</h3>

      <div className="sidebar-content">
        {isProfilePage ? (
          <>
            <button onClick={() => closeSidebar && closeSidebar()}>
              Profile
            </button>
            <button onClick={() => closeSidebar && closeSidebar()}>
              Dashboard
            </button>
          </>
        ) : (
          TOPICS.map((topic) => (
            <button
              key={topic}
              className={selectedTopic === topic ? "active" : ""}
              onClick={() => {
                setSelectedTopic(topic);   // ✅ ONLY SELECT TOPIC
                closeSidebar && closeSidebar();
              }}
            >
              {topic === "random"
                ? "Random Questions"
                : topic.replace(/-/g, " ")}
            </button>
          ))
        )}
      </div>
    </aside>
  );
}
