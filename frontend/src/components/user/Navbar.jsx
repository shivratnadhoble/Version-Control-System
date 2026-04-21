import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext";
import "./navbar.css";

const Navbar = () => {
    const { setCurrentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setCurrentUser(null);
        navigate("/auth");
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="logo-link">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg"
                        alt="GitHub Logo"
                        className="nav-logo"
                    />
                    <h3 className="nav-brand">GitHub Clone</h3>
                </Link>
                <div className="nav-search">
                    <input type="text" placeholder="Search or jump to..." className="search-input" />
                </div>
                <div className="nav-links">
                    <Link to="/pulls"><p>Pull requests</p></Link>
                    <Link to="/issues"><p>Issues</p></Link>
                    <Link to="/codespaces"><p>Codespaces</p></Link>
                    <Link to="/marketplace"><p>Marketplace</p></Link>
                    <Link to="/explore"><p>Explore</p></Link>
                </div>
            </div>
            <div className="navbar-right">
                <Link to="/create" className="nav-icon-link">
                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16" fill="currentColor">
                        <path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"></path>
                    </svg>
                </Link>
                <div className="profile-menu">
                    <Link to="/profile" className="profile-link">
                        <div className="nav-profile-image"></div>
                    </Link>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;