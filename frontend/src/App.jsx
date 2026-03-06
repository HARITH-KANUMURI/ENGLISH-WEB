import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Learn from "./pages/Learn";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import ComingSoon from "./pages/ComingSoon";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Concepts from "./pages/Concepts";

import { AuthProvider, useAuth } from "./auth/AuthContext";

/* ---------------- Protected Route ---------------- */

function Protected({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

/* ---------------- Root App ---------------- */

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

/* ---------------- Main App ---------------- */

function MainApp() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("random");

  const location = useLocation();

  const isQuiz = location.pathname === "/quiz";
  const isResult = location.pathname === "/result";
  const isContest = location.pathname === "/contest";

  // Sidebar should NOT appear on quiz, result, contest
  const hideSidebar = isQuiz || isResult || isContest;

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <Header
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="page-body">
        {!hideSidebar && (
          <Sidebar
            isOpen={sidebarOpen}
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
            closeSidebar={() => setSidebarOpen(false)}
          />
        )}

        <main className="content">
          <Routes>
            {/* ---------- AUTH ---------- */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* ---------- LEARN ---------- */}
            <Route
              path="/learn"
              element={
                <Protected>
                  <Learn
                    selectedTopic={selectedTopic}
                    sidebarOpen={sidebarOpen}
                  />
                </Protected>
              }
            />

            {/* ---------- QUIZ ---------- */}
            <Route
              path="/quiz"
              element={
                <Protected>
                  <Quiz selectedTopic={selectedTopic} />
                </Protected>
              }
            />

            {/* ---------- RESULT ---------- */}
            <Route
              path="/result"
              element={
                <Protected>
                  <Result />
                </Protected>
              }
            />

            {/* ---------- CONCEPTS ---------- */}
            <Route
              path="/concepts"
              element={
                <Protected>
                  <Concepts selectedTopic={selectedTopic} />
                </Protected>
              }
            />

            {/* ---------- DASHBOARD ---------- */}
            <Route
              path="/dashboard"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />

            {/* ---------- PROFILE ---------- */}
            <Route
              path="/profile"
              element={
                <Protected>
                  <Profile />
                </Protected>
              }
            />

            {/* ---------- CONTEST ---------- */}
            <Route path="/contest" element={<ComingSoon />} />

            {/* ---------- FALLBACK ---------- */}
            <Route path="*" element={<Navigate to="/learn" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
