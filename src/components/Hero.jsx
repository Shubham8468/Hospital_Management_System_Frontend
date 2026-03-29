import React from "react";
const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            ZeeCare’s mission is to redefine healthcare management through technology-driven innovation. We focus on building intuitive and scalable solutions that help hospitals optimize workflows, manage data effectively, and deliver exceptional patient experiences in a fast-paced digital world.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};
export default Hero;
