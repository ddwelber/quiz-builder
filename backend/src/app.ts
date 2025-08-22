import express from "express";
import cors from "cors";
import routes from "./routes";

export const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173/"],
  })
);

app.use(express.json());

app.use("/api", routes);
