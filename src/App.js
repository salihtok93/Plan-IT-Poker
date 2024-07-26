// src/App.js
import React from "react";
import Dashboard from "./Pages/Dashboard";
import Register from "./Components/Register";
function App() {
  return (
    <div className="App">
      <Register />
      <hr />
      <Dashboard />
    </div>
  );
}

export default App;
