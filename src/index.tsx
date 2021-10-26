import React from "react";
import "./tailwind.css";
import "./index.css";
import ReactDOM from "react-dom";

import Routes from "./routes/Routes";
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
