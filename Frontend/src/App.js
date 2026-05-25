import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import CSVUpload from "./pages/CSVUpload";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/prediction"
          element={<Prediction />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/csv-upload"
          element={<CSVUpload />}
        />


      </Routes>

    </BrowserRouter>
  );
}

export default App;