// src/App.js
import React from "react";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./Components/navbar";
// import RoomTable from "./Components/roomtable";
// import Choice from "./Components/choice";
// import NewStory from "./Components/newstory";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Dashboard />
      {/* <Choice /> */}
      {/* <RoomTable /> */}
      {/* <NewStory /> */}
    </div>
  );
}

export default App;
