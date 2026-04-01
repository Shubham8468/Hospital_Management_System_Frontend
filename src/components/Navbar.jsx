import React, { useContext, useState } from "react";
import { useToast } from "./Toast/ToastContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../main";
import { GiHamburgerMenu } from "react-icons/gi";
import { getApiUrl, API_ENDPOINTS } from "../config/apiConfig";

const Navbar = () => {
    const toast = useToast();
    const [show, setShow] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const navigate = useNavigate();
    // Handle logout
    const handleLogout = async () => {
        try {
            const resp = await axios.get(getApiUrl(API_ENDPOINTS.USER_LOGOUT), {
                withCredentials: true
            });
            toast.success(resp.data?.message);
            setIsAuthenticated(false);
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to logout");
        }
    };

    // Navigate to login page
    const goToLogin = () => {
        navigate("/login");
    };

    // Close menu when clicking on a link
    const handleLinkClick = () => {
        setShow(false);
    };
    return (
        <nav className="container">
            <div className="logo" onClick={() => {
                navigate("/");
                handleLinkClick();
            }} style={{ cursor: "pointer" }}>
                <img className="logo-img" src="/logo.png" alt="logo" />
            </div>

            <div className={show ? "navLinks showmenu" : "navLinks"}>
                <div className="links">
                    <Link to="/" onClick={handleLinkClick}>Home</Link>
                    <Link to="/appointment" onClick={handleLinkClick}>Appointment</Link>
                    <Link to="/aboutus" onClick={handleLinkClick}>About Us</Link>
                </div>
                {isAuthenticated ? (
                    <button className="logoutBtn btn" onClick={handleLogout}>Logout</button>
                ) : (
                    <button className="loginBtn btn" onClick={goToLogin}>Login</button>
                )}
            </div>

            <div className="hamburger" onClick={() => setShow(!show)}>
                <GiHamburgerMenu />
            </div>
        </nav>
    );
};

export default Navbar;