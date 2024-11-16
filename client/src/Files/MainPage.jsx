import React from "react";
import ImageSection from "./ImageSection";
import ImageUpload from "./ImageUpload";
import "./Styles.css";

function MainPage() {
  return (
    <div className="position">
      <ImageUpload />
      <ImageSection />
    </div>
  );
}

export default MainPage;
