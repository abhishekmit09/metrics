import React, { useState } from "react";
import { ServiceCard } from "./components/ServiceCard";
import { ServiceModal } from "./components/ServiceModal";
import { useMetricsStream } from "./hooks/useMetricsStream";
import { useMetrics } from "./context/MetricsContext";

function App() {
  useMetricsStream(); // data load on ui start

  const { state, dispatch } = useMetrics();
  const [selected, setSelected] = useState<string | null>(null);

  const services = state.services;
  const names = Object.keys(services);

  const updateCount = async (change: number) => {
    try {
      const cfgRes = await fetch("http://localhost:4000/config");
      const cfg = await cfgRes.json();

      const next = Math.max(1, cfg.serviceCount + change);

      await fetch(`http://localhost:4000/config?n=${next}`);

      // refresh list
      const freshRes = await fetch("http://localhost:4000/config");
      const fresh = await freshRes.json();

      dispatch({ type: "setServices", names: fresh.services });
    } catch (err) {
      console.error("failed to update count", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 12 }}>Live Metrics</h1>

      <div style={{ marginBottom: 16 }}>
        <button onClick={() => updateCount(1)} style={btn}>
          Add Service
        </button>
        <button onClick={() => updateCount(-1)} style={btn}>
          Remove Service
        </button>
      </div>

      <div style={grid}>
        {names.map((name) => (
          <ServiceCard
            key={name}
            metric={services[name].latest}
            onClick={setSelected}
          />
        ))}
      </div>

      <ServiceModal
        serviceName={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

const btn: React.CSSProperties = {
  marginRight: 8,
  padding: "8px 12px",
  cursor: "pointer",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))",
  gap: 16,
};

export default App;
