import { Router } from "express";
import { ServiceSimulator } from "../simulator";

export default function metricsRouter(sim: ServiceSimulator) {
  const router = Router();

  router.get("/stream", (req, res) => {
    // basic SSE setup
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    if (res.flushHeaders) res.flushHeaders();

    console.log("sse connected");

    // initial dump
    const firstPayload = {
      serviceCount: sim.getCount(),
      services: sim.getServiceNames(),
    };
    res.write(`event: config\ndata: ${JSON.stringify(firstPayload)}\n\n`);

    // keep alive ping
    const pingTimer = setInterval(() => {
      res.write(":\n\n");
    }, 2500); 

    // push metrics
    const metricsTimer = setInterval(() => {
      const metrics = sim.produceAll();
      metrics.forEach((m) => {
        res.write(`event: metric\ndata: ${JSON.stringify(m)}\n\n`);
      });
    }, 1500); 

    req.on("close", () => {
      console.log("sse closed");
      clearInterval(metricsTimer);
      clearInterval(pingTimer);
    });
  });

  return router;
}
