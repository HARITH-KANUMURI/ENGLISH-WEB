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

import { AuthProvider, useAuth } from "./auth/AuthContext";


function Protected({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

function MainApp() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const location = useLocation();
  const isQuiz = location.pathname === "/quiz";

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <Header
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="page-body">
        {!isQuiz && (
          <Sidebar
  selectedTopic={selectedTopic}
  setSelectedTopic={setSelectedTopic}
  closeSidebar={() => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  }}
/>

        )}

        <main className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

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


            <Route
              path="/quiz"
              element={
                <Protected>
                  <Quiz selectedTopic={selectedTopic} />
                </Protected>
              }
            />
            <Route
  path="/dashboard"
  element={
    <Protected>
      <Dashboard />
    </Protected>
  }
/>

              <Route
                path="/profile"
                  element={
                <Protected>
                <Profile />
                </Protected>
                }
                />

            <Route
              path="/result"
              element={
                <Protected>
                  <Result />
                </Protected>
              }
            />

            <Route path="/concepts" element={<ComingSoon />} />
            <Route path="/contest" element={<ComingSoon />} />

            <Route path="*" element={<Navigate to="/learn" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
