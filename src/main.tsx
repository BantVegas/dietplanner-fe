import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// HelmetProvider NEPOUŽÍVAJ! V React 19 + Vite je to problémové!

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
