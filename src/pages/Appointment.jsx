import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppoinmetForm";

const Appointment=()=>{
    return (
        <div>
       <Hero title={"Book Appointments in Seconds. "} imageUrl={"/signin.png"}>
       </Hero>
       <AppointmentForm/>
       
        </div>
    )
}
export default Appointment;
