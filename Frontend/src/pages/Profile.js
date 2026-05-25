import React from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <div className="d-flex">

      <Sidebar />

      <div
        className="w-100"
        style={{
          background: "#0f172a",
          minHeight: "100vh",
          color: "white",
        }}
      >

        <Navbar />

        <div className="container p-4">

          <div
            className="card bg-dark text-white p-5 shadow"
            style={{
              borderRadius: "15px",
            }}
          >

            <h2 className="mb-4">
              User Profile
            </h2>

            <hr />

            <h4 className="mt-4">
              Name :
              {" "}
              {user?.name}
            </h4>

            <h4 className="mt-4">
              Email :
              {" "}
              {user?.email}
            </h4>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;