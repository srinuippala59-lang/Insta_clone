import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FaInstagram } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import {
  FiSend,
  FiSearch,
  FiHeart,
  FiPlus,
  FiMenu,
  FiGrid,
  FiSettings,
  FiActivity,
  FiBookmark,
  FiSun,
  FiAlertCircle,
} from "react-icons/fi";
import { currentUser } from "../../Data/feedData";
import "./index.css";

const menuItems = [
  { label: "Settings", icon: <FiSettings /> },
  { label: "Your activity", icon: <FiActivity /> },
  { label: "Saved", icon: <FiBookmark /> },
  { label: "Switch appearance", icon: <FiSun /> },
  { label: "Report a problem", icon: <FiAlertCircle /> },
];

function Sidebar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close the menu when you click anywhere outside it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-panel">
        <Link to="/feed" className="sidebar-logo">
          <FaInstagram />
        </Link>

        <nav className="sidebar-menu">
          <button
            className="sidebar-btn"
            aria-label="Home"
            onClick={() => navigate("/feed")}
          >
            <AiFillHome />
            <span className="sidebar-label">Home</span>
          </button>
          <button
            className="sidebar-btn"
            aria-label="Reels"
            onClick={() => navigate("/reels")}
          >
            <BiMoviePlay />
            <span className="sidebar-label">Reels</span>
          </button>
          <button
            className="sidebar-btn"
            aria-label="Messages"
            onClick={() => navigate("/messages")}
          >
            <FiSend />
            <span className="badge">4</span>
            <span className="sidebar-label">Messages</span>
          </button>
          <button className="sidebar-btn" aria-label="Search">
            <FiSearch />
            <span className="sidebar-label">Search</span>
          </button>
          <button className="sidebar-btn" aria-label="Notifications">
            <FiHeart />
            <span className="sidebar-label">Notifications</span>
          </button>
          <button className="sidebar-btn" aria-label="Create">
            <FiPlus />
            <span className="sidebar-label">Create</span>
          </button>
          <button className="sidebar-btn" aria-label="Profile">
            <img
              className="sidebar-avatar"
              src={currentUser.avatar}
              alt="profile"
            />
            <span className="sidebar-label">Profile</span>
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="more-wrapper" ref={menuRef}>
            {menuOpen && (
              <div className="more-menu">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    className="more-item"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}

                <div className="more-divider thick" />

                <button
                  className="more-item"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/");
                  }}
                >
                  <span>Switch accounts</span>
                </button>

                <div className="more-divider thin" />

                <button className="more-item" onClick={handleLogout}>
                  <span>Log out</span>
                </button>
              </div>
            )}

            <button
              className={`sidebar-btn ${menuOpen ? "active" : ""}`}
              aria-label="More"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FiMenu />
              <span className="sidebar-label">More</span>
            </button>
          </div>

          <button className="sidebar-btn" aria-label="Also from Meta">
            <FiGrid />
            <span className="sidebar-label">Also from Meta</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
