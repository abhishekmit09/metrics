import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { MetricsProvider } from "./context/MetricsContext";
import "./styles/global.css";

const root = createRoot(document.getElementById("root")!);

root.render(
  <MetricsProvider>
    <App />
  </MetricsProvider>
);
