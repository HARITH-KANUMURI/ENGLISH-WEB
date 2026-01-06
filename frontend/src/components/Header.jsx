import logo from "../assets/logo.png";
import avatar from "../assets/profile-placeholder.png";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header({ darkMode, toggleDarkMode }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Learnova" className="logo" />
        <h2>Learnova</h2>
      </div>

      <div className="header-right">
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? "🌙" : "☀️"}
        </button>

        {user && (
          <button
            className="profile-btn"
            onClick={() => navigate("/profile")}
          >
            <img
              src={avatar}
              alt="Profile"
              className="profile-avatar-img"
            />
          </button>
        )}
      </div>
    </header>
  );
}
