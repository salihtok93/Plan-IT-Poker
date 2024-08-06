// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoutes from "./utility/ProtectedRoutes";
import Layout from "./layouts/Layout";
import RegisterPage from "./Pages/RegisterPage";
//import Dashboard from "./Pages/Dashboard";
//import Navbar from "./Components/navbar";
// import RoomTable from "./Components/roomtable";
// import Choice from "./Components/choice";
// import NewStory from "./Components/newstory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<ProtectedRoutes />}>
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
