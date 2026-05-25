import React from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaHome,
  FaBrain,
  FaFileAlt,
  FaUser,
  FaUpload,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.clear();

    navigate("/");
  };

  return (

    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        background: "#111827",
        color: "white",
        padding: "20px",
      }}
    >

      <h3 className="text-center mb-5">
        Dashboard
      </h3>

      <ul className="list-unstyled">

        <li className="mb-4">

          <Link
            to="/dashboard"
            className="text-decoration-none text-white"
          >

            <FaHome className="me-2" />

            Home

          </Link>

        </li>

        <li className="mb-4">

          <Link
            to="/prediction"
            className="text-decoration-none text-white"
          >

            <FaBrain className="me-2" />

            AI Prediction

          </Link>

        </li>

        <li className="mb-4">

          <Link
            to="/reports"
            className="text-decoration-none text-white"
          >

            <FaFileAlt className="me-2" />

            Reports

          </Link>

        </li>

        <li className="mb-4">

          <Link
            to="/profile"
            className="text-decoration-none text-white"
          >

            <FaUser className="me-2" />

            Profile

          </Link>

        </li>

        <li className="mb-4">

          <Link
            to="/csv-upload"
            className="text-decoration-none text-white"
          >

            <FaUpload className="me-2" />

            CSV Upload

          </Link>

        </li>

        <li className="mt-5">

          <button
            className="btn btn-danger w-100"
            onClick={logout}
          >

            <FaSignOutAlt className="me-2" />

            Logout

          </button>

        </li>

      </ul>

    </div>
  );
}

export default Sidebar;