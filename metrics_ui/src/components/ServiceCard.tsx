import React from "react";
import { Metric } from "../types/Metric";

type Props = {
  metric?: Metric;
  onClick: (service: string) => void;
};

const pickColor = (m?: Metric) => {
  if (!m) return "#ccc";
  if (m.cpu > 80 || m.errorRate > 5) return "#e35b5b";
  if (m.cpu >= 60) return "#d8b200";
  return "#5bbf6a";
};

function ServiceCard({ metric, onClick }: Props) {
  const name = metric?.serviceName ?? "Loading";

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
        background: "#fff",
        cursor: metric ? "pointer" : "default",
      }}
    >
      <h3 style={{ margin: "0 0 6px" }}>{name}</h3>
      <p>CPU: {metric?.cpu ?? "—"}%</p>
      <p>Memory: {metric?.memory ?? "—"}%</p>
      <p>Error: {metric?.errorRate ?? "—"}%</p>
    </div>
  );
}

export default React.memo(ServiceCard);
