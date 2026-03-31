import React from "react";
import CarouselModule from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Carousel = CarouselModule?.default || CarouselModule;

const Departments = () => {
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/departments/pedia.jpg",
      description: "Child Care"
    },
    {
      name: "Orthopedics",
      imageUrl: "/departments/ortho.jpg",
      description: "Bone Care"
    },
    {
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
      description: "Heart Care"
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neuro.jpg",
      description: "Brain Care"
    },
    {
      name: "Oncology",
      imageUrl: "/departments/onco.jpg",
      description: "Cancer Care"
    },
    {
      name: "Radiology",
      imageUrl: "/departments/radio.jpg",
      description: "Imaging"
    },
    {
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.jpg",
      description: "Rehabilitation"
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
      description: "Skin Care"
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
      description: "Ear, Nose & Throat"
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <div className="container departments">
        <div className="departments-header">
          <h2>Our Departments</h2>
          <p className="departments-subtitle">World-Class Healthcare Services</p>
        </div>
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={[
            "tablet",
            "mobile",
          ]}
        >
          {departmentsArray.map((depart, index) => {
            return (
              <div key={index} className="card">
                <img src={depart.imageUrl} alt={depart.name} className="card-image" />
                <div className="card-overlay"></div>
                <div className="card-content">
                  <div className="depart-name">{depart.name}</div>
                  <p className="depart-description">{depart.description}</p>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Departments;