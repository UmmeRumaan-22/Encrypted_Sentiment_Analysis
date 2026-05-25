import React, { useState } from "react";

import API from "../api";

import {
  useNavigate,
  Link,
} from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/login",
        form
      );

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        res.data.token
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Invalid Credentials");
    }
  };

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              Login
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="form-control mb-3"
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="form-control mb-3"
                onChange={handleChange}
              />

              <button className="btn btn-primary w-100">
                Login
              </button>

            </form>

            <p className="text-center mt-3">

              Don't have account?

              <Link to="/signup">
                Sign Up
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;