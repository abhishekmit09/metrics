import { Router } from "express";
import { ServiceSimulator } from "../simulator";

export default function configRouter(sim: ServiceSimulator) {
  const router = Router();

  router.get("/", (req, res) => {
    const { n } = req.query;

    // update count
    if (n) {
      const count = Number(n);
      if (!isNaN(count) && count > 0) {
        sim.setCount(count);
      }
    }

    // return current state
    res.json({
      serviceCount: sim.getCount(),
      services: sim.getServiceNames(),
    });
  });

  return router;
}
