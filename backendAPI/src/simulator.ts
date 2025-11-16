import { randomFloat } from "./utils";

export type Metric = {
  serviceName: string;
  cpu: number;
  memory: number;
  errorRate: number;
  timestamp: number;
};

export class ServiceSimulator {
  private serviceNames: string[];

  constructor(initialCount = 5) {
    this.serviceNames = this.makeNames(initialCount);
  }

  // Change count of simulated services
  setCount(count: number) {
    if (count < 1) return; 
    this.serviceNames = this.makeNames(count);
  }

  getCount() {
    return this.serviceNames.length;
  }

  getServiceNames() {
   
    return [...this.serviceNames];
  }

  // create service name
  private makeNames(n: number) {
    const names = [];
    for (let i = 1; i <= n; i++) {
      names.push(`service-${i}`);
    }
    return names;
  }

  // Generate random metric
  produceAll(): Metric[] {
    const now = Date.now();

    return this.serviceNames.map((name) => ({
      serviceName: name,
      cpu: Math.round(randomFloat(5, 95)),
      memory: Math.round(randomFloat(10, 90)),
      errorRate: Number((randomFloat(0, 1)).toFixed(1)),
      timestamp: now,
    }));
  }
}
