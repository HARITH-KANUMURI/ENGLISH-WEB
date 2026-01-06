import avatar from "../assets/profile-placeholder.png";
import { useAuth } from "../auth/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={avatar}
            alt="Profile"
            className="profile-avatar-small"
          />

          <div>
            <h3>Student Profile</h3>
            <p className="profile-email">
              {user.email}
            </p>
          </div>
        </div>

        <div className="profile-details">
          <Detail label="Account Type" value="Email / Password" />
          <Detail label="Status" value="Active" />
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="profile-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
