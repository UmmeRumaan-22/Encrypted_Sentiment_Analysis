import React, { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../api";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Reports() {

  const [reports, setReports] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {

    fetchReports();

  }, []);

  const fetchReports = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get(
        "/sentiment/history",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setReports(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  // SEARCH FILTER

  const filteredReports = reports.filter((item) =>
    item.message.toLowerCase().includes(search.toLowerCase())
  );

  // EXPORT PDF

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "Encrypted Sentiment Analysis Reports",
      14,
      20
    );

    const tableColumn = [
      "Message",
      "Positive",
      "Neutral",
      "Negative",
      "Date",
    ];

    const tableRows = [];

    reports.forEach((item) => {

      const rowData = [

        item.message,
        item.positive,
        item.neutral,
        item.negative,

        new Date(item.created_at)
          .toLocaleString(),

      ];

      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("sentiment_reports.pdf");
  };

  return (

    <div className="d-flex">

      <Sidebar />

      <div
        className="w-100"
        style={{
          backgroundColor: "#0f172a",
          minHeight: "100vh",
          color: "white",
        }}
      >

        <Navbar />

        <div className="container-fluid p-4">

          <div className="d-flex justify-content-between align-items-center">

            <h2 className="fw-bold">
              Prediction Reports
            </h2>

            <button
              className="btn btn-success"
              onClick={exportPDF}
            >
              Export PDF
            </button>

          </div>

          {/* SEARCH */}

          <div className="mt-4 mb-4">

            <input
              type="text"
              className="form-control"
              placeholder="Search Message"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          {/* TABLE */}

          <div
            className="table-responsive"
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "15px",
            }}
          >

            <table className="table table-dark table-hover">

              <thead>

                <tr>

                  <th>Message</th>

                  <th>Positive</th>

                  <th>Neutral</th>

                  <th>Negative</th>

                  <th>Status</th>

                  <th>Date</th>

                </tr>

              </thead>

              <tbody>

                {
                  filteredReports.length > 0 ? (

                    filteredReports.map((item) => (

                      <tr key={item.id}>

                        <td>{item.message}</td>

                        <td>{item.positive}</td>

                        <td>{item.neutral}</td>

                        <td>{item.negative}</td>

                        <td>

                          {
                            item.positive === 1 ? (

                              <span className="badge bg-success">
                                Positive
                              </span>

                            ) : item.negative === 1 ? (

                              <span className="badge bg-danger">
                                Negative
                              </span>

                            ) : (

                              <span className="badge bg-warning text-dark">
                                Neutral
                              </span>
                            )
                          }

                        </td>

                        <td>

                          {
                            new Date(item.created_at)
                              .toLocaleString()
                          }

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="6"
                        className="text-center"
                      >
                        No Reports Found
                      </td>

                    </tr>
                  )
                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Reports;