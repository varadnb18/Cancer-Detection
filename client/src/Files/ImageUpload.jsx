import React, { useState } from "react";
import axios from "axios";

import "./Styles.css";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(null); // Clear the preview temporarily to show an update effect
      setPrediction(""); // Clear prediction output
      setError(""); // Clear error message
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Set preview for the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePredict = async () => {
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.prediction) {
        setPrediction(response.data.prediction);
        setError("");
      } else {
        setError("Prediction failed");
        setPrediction("");
      }
    } catch (err) {
      setError("Error: " + err.message);
      setPrediction("");
    }
  };

  return (
    <div className="list-container1">
      <div className="con">
        <div className="con2">
          <div className="con1">
            <h1 className="head">Cancer Detection Prediction</h1>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            <button onClick={handlePredict} className="predict-button">
              Predict
            </button>
            <h2>Uploaded Image:</h2>
            {prediction && (
              <div>
                <h2>Prediction: {prediction}</h2>
              </div>
            )}

            {imagePreview && (
              <div className="image-preview" style={{ margin: 0 }}>
                <img
                  src={imagePreview}
                  alt="Uploaded Preview"
                  className="preview-image"
                  style={{ margin: 0 }}
                />
              </div>
            )}

            {error && (
              <div style={{ color: "red" }}>
                <h3>{error}</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
