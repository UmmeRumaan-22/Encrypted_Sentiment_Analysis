import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function Dashboard() {

  const [reports, setReports] = useState([]);

  useEffect(() => {

    fetchReports();

  }, []);

  const fetchReports = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/sentiment/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReports(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const positive =
    reports.filter((r) => r.positive === 1).length;

  const negative =
    reports.filter((r) => r.negative === 1).length;

  const neutral =
    reports.filter((r) => r.neutral === 1).length;

  const pieData = [

    {
      name: "Positive",
      value: positive,
    },

    {
      name: "Negative",
      value: negative,
    },

    {
      name: "Neutral",
      value: neutral,
    },
  ];

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

        <div className="container-fluid p-4">

  <h1
    className="fw-bold mb-4"
    style={{ color: "#e2e8f0" }}
  >
    AI Analytics Dashboard
  </h1>

  <div className="row g-4">

    {/* TOTAL PREDICTIONS */}

    <div className="col-md-3">

      <div
        className="card border-0 shadow-lg p-4"
        style={{
          background: "#1e293b",
          borderRadius: "20px",
          color: "white",
        }}
      >

        <h5 className="text-info">
          Total Predictions
        </h5>

        <h1 className="fw-bold mt-3">
          {reports.length}
        </h1>

      </div>

    </div>

    {/* POSITIVE */}

    <div className="col-md-3">

      <div
        className="card border-0 shadow-lg p-4"
        style={{
          background: "#14532d",
          borderRadius: "20px",
          color: "white",
        }}
      >

        <h5>
          Positive Reviews
        </h5>

        <h1 className="fw-bold mt-3">
          {positive}
        </h1>

      </div>

    </div>

    {/* NEGATIVE */}

    <div className="col-md-3">

      <div
        className="card border-0 shadow-lg p-4"
        style={{
          background: "#7f1d1d",
          borderRadius: "20px",
          color: "white",
        }}
      >

        <h5>
          Negative Reviews
        </h5>

        <h1 className="fw-bold mt-3">
          {negative}
        </h1>

      </div>

    </div>

    {/* NEUTRAL */}

    <div className="col-md-3">

      <div
        className="card border-0 shadow-lg p-4"
        style={{
          background: "#78350f",
          borderRadius: "20px",
          color: "white",
        }}
      >

        <h5>
          Neutral Reviews
        </h5>

        <h1 className="fw-bold mt-3">
          {neutral}
        </h1>

      </div>

    </div>

  </div>

{/* </div> */}
          <div className="row mt-5">

            <div className="col-md-6">

              <div className="card bg-dark p-4">

                <h3>
                  Sentiment Pie Chart
                </h3>

                <ResponsiveContainer
                  width="100%"
                  height={300}
                >

                  <PieChart>

                    <Pie
                      data={pieData}
                      dataKey="value"
                      outerRadius={100}
                      label
                    >

                      <Cell fill="#22c55e" />
                      <Cell fill="#ef4444" />
                      <Cell fill="#facc15" />

                    </Pie>

                    <Tooltip />

                  </PieChart>

                </ResponsiveContainer>

              </div>

            </div>

            <div className="col-md-6">

              <div className="card bg-dark p-4">

                <h3>
                  Prediction Analytics
                </h3>

                <ResponsiveContainer
                  width="100%"
                  height={300}
                >

                  <BarChart data={pieData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="value"
                      fill="#3b82f6"
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;