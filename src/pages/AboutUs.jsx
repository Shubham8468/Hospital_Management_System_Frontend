import React from "react"
import Hero from "../components/Hero"
import Biography from "../components/Biography";
const AboutUs=()=>{
    return (
        <>
           
         <Hero title={"Learn More About Us | ZeeCare Medical Institue"}  imageUrl={"./about.png"}/> 
         <Biography title={""} imageUrl={"/whoweare.png"} />
    
        </>
    )
}

export default AboutUs;