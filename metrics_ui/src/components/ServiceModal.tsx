import React from "react";
import { useMetrics } from "../context/MetricsContext";
import { Chart } from "./Chart";

type Props = {
  serviceName: string | null;
  onClose: () => void;
};

function ServiceModal({ serviceName, onClose }: Props) {
  const { state } = useMetrics();
  const svc = serviceName ? state.services[serviceName] : undefined;

  if (!svc) return null;

  const { latest } = svc;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
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
}

export default React.memo(ServiceModal);



const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  paddingTop: 40,
};

const modalStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: 8,
  padding: "20px 24px",
  width: "70%",
  maxWidth: 760,
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
