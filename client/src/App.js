import React, { useEffect, useState } from "react";
import "./App.css";
import ComponentParent from "./components/componentParent/componentParent.js";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        width: "100%",
        height: "100%",
        position: "fixed"
      }}
    >
      <ComponentParent />
    </div>
  );
}

export default App;
