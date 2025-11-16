import React, { useMemo } from "react";
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

const ChartComponent: React.FC<Props> = ({ data }) => {
  const formatted = useMemo(() => {
    if (!data?.length) return [];
    return data.map((item) => ({
      ...item,
      label: new Date(item.timestamp).toLocaleTimeString(),
    }));
  }, [data]);

  return (
    <div style={wrapperStyle}>
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

export const Chart = React.memo(ChartComponent);

const wrapperStyle: React.CSSProperties = {
  height: 240,
};
