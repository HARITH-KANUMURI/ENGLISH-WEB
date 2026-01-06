import { useNavigate } from "react-router-dom";

export default function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <button onClick={toggleSidebar}>☰</button>
      <button onClick={() => navigate("/concepts")}>Concepts</button>
      <button onClick={() => navigate("/learn")}>Practice with Learn</button>
      <button onClick={() => navigate("/contest")}>Contest</button>

      <div className="nav-right">
        <button className="contact-btn">Contact Us</button>
      </div>
    </nav>
  );
}
