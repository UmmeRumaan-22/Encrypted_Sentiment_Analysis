import React from "react";

function Navbar() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div
      className="d-flex justify-content-between align-items-center p-3 bg-white shadow-sm"
    >
      <h4>Encrypted Sentiment Analysis</h4>

      <div>
        <span className="fw-bold">
          Welcome {user?.name}
        </span>
      </div>
    </div>
  );
}

export default Navbar;