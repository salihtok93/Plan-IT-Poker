// src/App.js
import React from "react";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./Components/navbar";
// import RoomTable from "./Components/roomtable";
// import Choice from "./Components/choice";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Dashboard />
      <hr />
      {/* <Choice /> */}
      {/* <RoomTable /> */}
    </div>
  );
}

export default App;
