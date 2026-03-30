import React, { useContext, useState } from "react";
import { useToast } from "./Toast/ToastContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../main";
const Navbar = () => {
    const toast = useToast();
    const [show, setShow] = useState(false)
    //How to get Auth from main.jsx
    const { isAuthenticated, setIsAuthenticated } = useContext(Context)
    const navigateTp = useNavigate();
    //Handle Logout 
    const handelLogout = async () => {
        try {
            const resp = await axios.get("http://localhost:4800/api/v1/user/patient/logout", {
                withCredentials: true
            });
            toast.success(resp.data?.message);
            setIsAuthenticated(false);

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed To Logout User!")
        }


    }
    //For Login 
    const gotologin = () => {
        navigateTp("/login")
    }
    return (
        <nav className="container">
            <div className="logo " onClick={()=>navigateTp("/")}>ZeeCare</div>
            <div className={show ? "navLinks showmenu" : "navLinks"}>
                <div className="links">
                    <Link to={"/"}>Home</Link>
                    <Link to={"/appointment"}>APPOINMENT</Link>
                    <Link to={"/aboutus"}>ABOUT US</Link>
                </div>
                { isAuthenticated ? (<button className="logoutBtn btn" onClick={() => handelLogout()}>LOGOUT</button>) :
                    (<button className="logoutBtn btn" onClick={gotologin}>LOGIN</button>)}

            </div>

        </nav>
    )
}

export default Navbar;