import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast/ToastContext";
import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig.js"

const Login = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const toast = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigateTp = useNavigate();


    const handelLogin = async (e) => {
        e.preventDefault();

        if (isAuthenticated) {
            navigateTo("/");
            return;
        }
        try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/user/patient/login`, {
                email, password, confirmPassword, role: "Patient"
            }, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            }).then((res) => {
                toast.success(res.data?.message);
                setIsAuthenticated(true);
                navigateTp("/")
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            });
        } catch (error) {
            toast.error(error.response?.data?.message || "Server not running")
        }

    }

    return (
        <div className="container form-component login-form">
            <h1>Welcome to ZeeCare Portal</h1>

            <p>Please Login To Continue</p>
            <p style={{ marginTop: "50px" }}> To manage appointments, view medical records, and stay connected with your healthcare provider.</p>
            <form onSubmit={handelLogin}>
                <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                <input type="Password" value={confirmPassword} placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                <div style={{ gap: "10px", justifyContent: "flex-end", flexDirection: "row" }}>
                    <p style={{ marginBottom: 0 }} onClick={() => navigateTp("/register")}>Not Registered? <span style={{ color: "blue" }}>Register</span></p>
                </div>
                <div style={{ justifyContent: "center", alignItems: "center" }}>
                    <button type="submit">Login</button>
                </div>

            </form>
        </div>
    )
}

export default Login;