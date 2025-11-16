import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Metric } from "../types/Metric";

type Props = {
  data: Metric[];
};

export const Chart: React.FC<Props> = ({ data }) => {
  // format timestamps for display
  const formatted = React.useMemo(() => {
    if (!data?.length) return [];
    return data.map((item) => ({
      ...item,
      label: new Date(item.timestamp).toLocaleTimeString(),
    }));
  }, [data]);

  return (
    <div className="chart-wrapper" style={{ height: 240 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formatted}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="cpu" stroke="#0a84ff" dot={false} />
          <Line type="monotone" dataKey="memory" stroke="#16a34a" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
