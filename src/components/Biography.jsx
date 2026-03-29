import React from "react";
const Biography = ({ imageUrl }) => {
    return (
        <div className="container biography">
            <div className="banner">
                <img src={imageUrl} alt="aboutImg" />

            </div>
            <div className="banner">
                <h1>Biography</h1>
                <p>ZeeCare is a modern hospital management application developed with the goal of simplifying and digitizing healthcare operations. It is designed to help hospitals and clinics efficiently manage patient records, appointments, billing, and staff activities through a centralized platform. By combining technology with healthcare needs, ZeeCare aims to reduce manual work, improve accuracy, and enhance the overall patient experience. The project reflects
                    a commitment to innovation, reliability, and better healthcare management solutions.</p>
                <p>ZeeCare leverages modern technologies to provide a secure and scalable environment for healthcare institutions. With features such as real-time data access, automated workflows, and intuitive dashboards, the system ensures that hospital staff can perform their tasks efficiently while maintaining high standards of data security and accuracy. The application is built with a user-centric approach, offering a clean and intuitive interface that minimizes
                    complexity and improves usability for both medical and administrative users.</p>
                
            </div>


        </div>
    )
};

export default Biography;