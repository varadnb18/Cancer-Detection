import React from "react";
import "./Styles.css";
import healthCareImage from "../images/health-care-img.png"; // Adjust the path as needed

const ImageSection = () => {
  return (
    <div className="con2">
      <img src={healthCareImage} alt="doctor" className="doctor" />
    </div>
  );
};

export default ImageSection;
