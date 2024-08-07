// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
  const [isLoggedIn,setIsLoggedIn] = useState(false);

    const checkLog = () => {
        if(localStorage.getItem('serverResponse')) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    };
    useEffect(() => {
        checkLog();
    },[]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/*unauthorized route */}
          {!isLoggedIn && (
            <>
              <Route path="/register" element={<RegisterPage />} />
              {/*<Route path="/" element={<RegisterPage />}/>*/}
            </>
          )}

          {/*Protected Routes*/}
          <Route element={<ProtectedRoutes />}>
            <Route path="/register" element={<Navigate to="/"/>}/>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
