import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from "react";
import { Metric } from "../types/Metric";

const HISTORY_LIMIT = 30;

type ServiceInfo = {
  latest?: Metric;
  history: Metric[];
};

type State = {
  services: Record<string, ServiceInfo>;
};

type Action =
  | { type: "metric"; metric: Metric }
  | { type: "setServices"; names: string[] };

function metricsReducer(state: State, action: Action): State {
  switch (action.type) {
    case "metric": {
      const m = action.metric;
      const prev = state.services[m.serviceName];

      // reuse existing history if present
      const nextHistory = prev ? [...prev.history, m] : [m];

      // keep recent samples only
      if (nextHistory.length > HISTORY_LIMIT) {
        nextHistory.splice(0, nextHistory.length - HISTORY_LIMIT);
      }

      return {
        ...state,
        services: {
          ...state.services,
          [m.serviceName]: {
            latest: m,
            history: nextHistory,
          },
        },
      };
    }

    case "setServices": {
      const map: Record<string, ServiceInfo> = {};

      action.names.forEach((name) => {
        map[name] = state.services[name] || { history: [] };
      });

      return {
        ...state,
        services: map,
      };
    }

    default:
      return state;
  }
}

const MetricsContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function MetricsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(metricsReducer, { services: {} });

  return (
    <MetricsContext.Provider value={{ state, dispatch }}>
      {children}
    </MetricsContext.Provider>
  );
}

export function useMetrics() {
  const ctx = useContext(MetricsContext);

  if (!ctx) {
    
    throw new Error("error");
  }

  return ctx;
}
