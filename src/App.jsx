import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ToastProvider } from "./components/Toast/ToastContext";
import ToastContainer from "./components/Toast/Toast";
import Navbar from "../src/components/Navbar"
import axios from "axios";
import { Context } from "./main";
import Footer from "./components/Footer";
import { getApiUrl, API_ENDPOINTS } from "./config/apiConfig";


const App = () => {
  const {isAuthenticated,setIsAuthenticated,setUser}=useContext(Context);
  useEffect(()=>{
    const fetchUser=async ()=>{
      try{
        const response = await axios.get(getApiUrl(API_ENDPOINTS.USER_ME),{
          withCredentials:true
        });
        setIsAuthenticated(true),
        setUser(response.data.user);// here we store user data that are comes from backend 

      }catch(error){
        setIsAuthenticated(false);
        setUser({})

      }
    }
    fetchUser();
  },[isAuthenticated]) // jb bhi isAuth ki value change ho to ye run kre 

  return (
    <ToastProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
       <Footer/>
      </Router>
      <ToastContainer />
    </ToastProvider>
  );
};

export default App;