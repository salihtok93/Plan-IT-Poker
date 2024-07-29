// src/App.js
import React from "react";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./Components/navbar";
// import RoomTable from "./Components/roomtable";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Dashboard />
      {/* <RoomTable /> */}
    </div>
  );
}

export default App;
