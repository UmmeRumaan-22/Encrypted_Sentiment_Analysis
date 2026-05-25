import React, { useState } from "react";

import API from "../api";

import { useNavigate, Link } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      console.log("Sending Data:", form);

      const res = await API.post(
        "/auth/signup",
        form
      );

      console.log(res.data);

      alert(res.data.message);

      navigate("/login");

    } catch (error) {

      console.log("FULL ERROR:", error);

      if (error.response) {

        console.log(error.response.data);

        alert(
          error.response.data.message
        );

      } else {

        alert("Server Not Responding");
      }

    } finally {

      setLoading(false);
    }
  };

  return (

    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "#0f172a",
      }}
    >

      <div
        className="card p-4 shadow-lg"
        style={{
          width: "400px",
          background: "#1e293b",
          color: "white",
          borderRadius: "15px",
        }}
      >

        <h2 className="text-center mb-4">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <button
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {
              loading
                ? "Registering..."
                : "Register"
            }
          </button>

        </form>

        <p className="text-center mt-3">

          Already have account?

          <Link
            to="/login"
            className="ms-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;