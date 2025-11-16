import React from "react";
import { Metric } from "../types/Metric";

type Props = {
  metric?: Metric;
  onClick: (service: string) => void;
};

// check color
const pickColor = (m?: Metric) => {
  if (!m) return "#ccc";

  if (m.cpu > 80 || m.errorRate > 5) return "#e35b5b";
  if (m.cpu >= 60) return "#d8b200";

  return "#5bbf6a";
};

export const ServiceCard: React.FC<Props> = ({ metric, onClick }) => {
  const name = metric?.serviceName || "Loading";

  const handleClick = () => {
    if (metric) onClick(metric.serviceName);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        border: `2px solid ${pickColor(metric)}`,
        padding: 14,
        borderRadius: 6,
        cursor: metric ? "pointer" : "default",
        background: "#fff",
      }}
    >
      <h3 style={{ margin: "0 0 6px" }}>{name}</h3>

      <p>CPU: {metric?.cpu ?? "—"}%</p>
      <p>Memory: {metric?.memory ?? "—"}%</p>
      <p>Error: {metric?.errorRate ?? "—"}%</p>
    </div>
  );
};
