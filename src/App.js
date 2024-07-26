// src/App.js
import React from "react";
import Dashboard from "./Pages/Dashboard";
// import Register from "./Components/Register";
import Navbar from "./Components/navbar";
function App() {
  return (
    <div className="App">
      {/* <Register /> */}
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;
