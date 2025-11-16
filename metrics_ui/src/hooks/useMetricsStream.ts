import { useEffect, useRef } from "react";
import { useMetrics } from "../context/MetricsContext";
import { Metric } from "../types/Metric";

export function useMetricsStream() {
  const { dispatch } = useMetrics();
  const sourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    let isShutDown = false;

    const connect = () => {
      if (isShutDown) return;

      const es = new EventSource("http://localhost:4000/metrics/stream");
      sourceRef.current = es;

      es.addEventListener("config", (evt) => {
        try {
          const payload = JSON.parse(evt.data);
          if (Array.isArray(payload?.services)) {
            dispatch({ type: "setServices", names: payload.services });
          }
        } catch (err) {
          console.warn("Invalid config message:", err);
        }
      });

      es.addEventListener("metric", (evt) => {
        try {
          const metric = JSON.parse(evt.data) as Metric;
          dispatch({ type: "metric", metric });
        } catch (err) {
          console.log("Invalid metric payload:", err);
        }
      });

      es.onerror = (err) => {
        console.log("Metrics stream disconnected.", err);
        es.close();

        
        setTimeout(connect, 1500);
      };
    };

    connect();

    return () => {
      isShutDown = true;
      sourceRef.current?.close();
    };
  }, [dispatch]);
}
