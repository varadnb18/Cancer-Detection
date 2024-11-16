from flask import Flask, request, jsonify
import tensorflow as tf
from PIL import Image
import numpy as np
import io
from flask_cors import CORS
import os


app = Flask(__name__)
CORS(app, origins="http://localhost:3000")  

model = tf.keras.models.load_model(r"C:\Users\varad\OneDrive\Desktop\Cancer-Detection\server\trained_model.h5")

class_names = ["glioma", "meningioma", "notumor", "pituitary"]


def model_prediction(test_image):
    try:
        image = Image.open(test_image)
        image = image.resize((128, 128))  
        
        if image.mode != 'RGB':
            image = image.convert('RGB')  

        input_arr = tf.keras.preprocessing.image.img_to_array(image)
        input_arr = np.array([input_arr])  

        predictions = model.predict(input_arr)

        result_index = np.argmax(predictions)

        return class_names[result_index]
    except Exception as e:
        return str(e)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
       
        result = model_prediction(file)
        
        if isinstance(result, str):  
            return jsonify({"prediction": result}), 200
        else:
            return jsonify({"error": "Prediction failed"}), 500
    except Exception as e:
        return jsonify({"error": f"Error in prediction: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
