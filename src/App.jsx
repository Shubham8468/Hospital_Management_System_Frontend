import react from "react";
import "./App.css"
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home"
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "var(--bg-tertiary)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-md)",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.9rem",
              padding: "12px 12px",
              boxShadow: "10px 10px 10px rgba(20, 9, 60, 0.15)",
              backgroundColor: "var(--bg-secondary)",
            },
            success: {
              iconTheme: { primary: "#00d48a", secondary: "#fff" },
            },
            error: {
              iconTheme: { primary: "#ff6b6b", secondary: "#fff" },
            },
          }}
        />
      </Router>
    </>
  );
};
export default App; 