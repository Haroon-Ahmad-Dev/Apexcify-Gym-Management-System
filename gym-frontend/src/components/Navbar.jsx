import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import {
  FaDumbbell,
  FaHome,
  FaInfoCircle,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import "../styles/navbar.css";

export const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="logo">
        <FaDumbbell className="logo-icon" />
        <span>Apexcify</span>Gym
      </div>

      {/* LINKS */}
      <div className="nav-links">
        <Link to="/">
          <FaHome /> Home
        </Link>

        <Link to="/about">
          <FaInfoCircle /> About
        </Link>

        {!user && (
          <>
            <Link to="/login" className="btn-outline">
              <FaSignInAlt /> Login
            </Link>

            <Link to="/signup" className="btn-primary">
              <FaUserPlus /> Signup
            </Link>
          </>
        )}

        {user && (
          <button className="btn-danger" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        )}
      </div>
    </nav>
  );
};
