import React, {
  useState,
} from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function CSVUpload() {

  const [file, setFile] =
    useState(null);

  const uploadCSV = async () => {

    try {

      const formData = new FormData();

      formData.append("file", file);

      await axios.post(
        "http://localhost:5000/api/upload/csv",
        formData
      );

      alert(
        "CSV Uploaded Successfully"
      );

    } catch (error) {

      console.log(error);

      alert("Upload Failed");
    }
  };

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
              CSV Upload
            </h2>

            <input
              type="file"
              className="form-control"
              onChange={(e) =>
                setFile(e.target.files[0])
              }
            />

            <button
              className="btn btn-primary mt-4"
              onClick={uploadCSV}
            >

              Upload CSV

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CSVUpload;