import React from "react";
import { useMetrics } from "../context/MetricsContext";
import { Chart } from "./Chart";

type Props = {
  serviceName: string | null;
  onClose: () => void;
};

export const ServiceModal: React.FC<Props> = ({ serviceName, onClose }) => {
  const { state } = useMetrics();

  if (!serviceName) return null;

  const svc = state.services[serviceName];
  if (!svc) return null;

  const latest = svc.latest;

  return (
    <div style={overlay}>
      <div style={modal}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 style={{ margin: 0 }}>{serviceName}</h2>
          <button onClick={onClose}>Close</button>
        </div>

        <div style={{ margin: "16px 0" }}>
          <Chart data={svc.history} />
        </div>

        <div>
          <p>CPU: {latest?.cpu ?? "—"}%</p>
          <p>Memory: {latest?.memory ?? "—"}%</p>
          <p>Error Rate: {latest?.errorRate ?? "—"}%</p>
        </div>
      </div>
    </div>
  );
};


const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  paddingTop: 40,
};

const modal: React.CSSProperties = {
  background: "#fff",
  borderRadius: 8,
  padding: "20px 24px",
  width: "70%",
  maxWidth: 760,
};
