import React, { useState, useCallback, useMemo } from "react";
import  ServiceCard  from "./components/ServiceCard";
import  ServiceModal from "./components/ServiceModal";
import { useMetricsStream } from "./hooks/useMetricsStream";
import { useMetrics } from "./context/MetricsContext";

function App() {
  //data load on ui start
  useMetricsStream(); 

  const { state, dispatch } = useMetrics();
  const [selected, setSelected] = useState<string | null>(null);

  const serviceNames = useMemo(() => Object.keys(state.services), [state.services]);

  const handleSelect = (name: string) => setSelected(name);

  const updateCount = useCallback(
    async (delta: number) => {
      try {
        const cfg = await (await fetch("/config")).json();
        const next = Math.max(1, cfg.serviceCount + delta);

        await fetch(`/config?n=${next}`);

        const fresh = await (await fetch("/config")).json();
        dispatch({ type: "setServices", names: fresh.services });
      } catch (e) {
        console.error("update failed", e);
      }
    },
    [dispatch]
  );

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 12 }}>Live Metrics</h1>

      <div style={{ marginBottom: 16 }}>
        <button onClick={() => updateCount(1)} style={buttonStyle}>Add Service</button>
        <button onClick={() => updateCount(-1)} style={buttonStyle}>Remove Service</button>
      </div>

      <div style={gridStyle}>
        {serviceNames.map((name) => (
          <ServiceCard
            key={name}
            metric={state.services[name].latest}
            onClick={handleSelect}
          />
        ))}
      </div>

      <ServiceModal serviceName={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

const buttonStyle = { padding: "8px 12px", marginRight: 8, cursor: "pointer" };

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: 16,
};

export default App;
