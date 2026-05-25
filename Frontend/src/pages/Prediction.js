import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api";

function Prediction() {
  const [message, setMessage] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const predictSentiment = async () => {
    if (!message.trim()) {
      alert("Please enter a message");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("User not logged in");
        return;
      }

      const res = await API.post(
        "/sentiment/predict",
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPrediction(res.data.prediction);
    } catch (error) {
      console.log("API Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="w-100 bg-light">
        <Navbar />

        <div className="container mt-4">
          <h2>Sentiment Prediction</h2>

          <textarea
            className="form-control mt-3"
            rows="5"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={predictSentiment}
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>

          {prediction && (
            <div className="card mt-4 p-4 shadow">
              <h4>Prediction Result</h4>
              <p>Positive: {prediction.positive}</p>
              <p>Neutral: {prediction.neutral}</p>
              <p>Negative: {prediction.negative}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Prediction;