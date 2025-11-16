import express from "express";
import cors from "cors";
import path from "path";
import configRouter from "./routes/config";
import metricsRouter from "./routes/metrics";
import { ServiceSimulator } from "./simulator";

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const app = express();

app.use(cors());
app.use(express.json());

// simple in memory simulator
const sim = new ServiceSimulator(5);

// API routes
app.use("/config", configRouter(sim));
app.use("/metrics", metricsRouter(sim));

// static files (frontend build)
const publicDir = path.join(__dirname, "..", "public");
app.use(express.static(publicDir));

// fallback to index
app.get("/", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

// listen
app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
