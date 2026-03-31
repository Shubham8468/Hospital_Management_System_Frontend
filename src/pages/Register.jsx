import React, { useContext, useState } from "react";
import { useToast } from "../components/Toast/ToastContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../main";
const Register = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context)
    const toast = useToast();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [aadhaarNumber, setAadhaarNumber] = useState("")
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const navigateTp = useNavigate();
    const handelResister = async (e) => {
        e.preventDefault();
        if (isAuthenticated) {
            return <navigateTp to="/" />
        }
        try {
            const response = await axios.post("http://localhost:4800/api/v1/user/patient/register",
                {
                    firstName,
                    lastName,
                    email,
                    phone,
                    aadhaarNumber,
                    dob,
                    gender,
                    password,
                    role: "Patient"
                },
                {
                    withCredentials: true,
                    headers: { "Context-Type": "application/json" }
                })
            toast.success(response.data?.message);
            navigateTp("/login")
        } catch (error) {
            toast.error(error.response?.data?.message);

        }
    }
    return (
        <div className="container form-component register-form">
            <h2>Welcome to ZeeCare Portal</h2>
            <p>Create Your Account</p>
            <p>Register to access hospital services, book appointments, and manage your health records securely.</p>
            <form onSubmit={handelResister}>
                <div>
                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div>
                    <input type="number" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <input type="number" placeholder="Addaar-Number" value={aadhaarNumber} onChange={(e) => setAadhaarNumber(e.target.value)} />
                </div>
                <div>
                    <input type="date" placeholder="Date fo Birth" value={dob} onChange={(e) => setDob(e.target.value)} />
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value={"male"}>Male</option>
                        <option value={"female"}>Female</option>
                        <option value={"other"}>Others</option>
                    </select>
                </div>

                <div>
                    <input type="passwprd" placeholder="Enter 8 Digite Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div style={{ gap: "10px", justifyContent: "flex-end", flexDirection: "row" }}>
                    <p style={{ marginBottom: 0 }} onClick={() => navigateTp("/login")}>Already have an account? <span style={{ color: "blue" }}>Login</span></p>
                </div>
                <div style={{ justifyContent: "center", alignItems: "center" }}>
                    <button type="submit">Register</button>
                </div>
            </form>

        </div>
    )
}

export default Register;