import React from "react";
import { Link } from "react-router-dom";

function Home() {

  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center bg-dark"
    >

      <div className="text-center text-white">

        <h1 className="display-4 fw-bold">
          Encrypted Sentiment Analysis
        </h1>

        <p className="mt-3 fs-4">
          Login or SignUp to Continue
        </p>

        <div className="mt-4">

          <Link
            to="/login"
            className="btn btn-primary btn-lg me-3"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="btn btn-success btn-lg"
          >
            Sign Up
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Home;