import express from "express";
import cors from "cors";
import routes from "./routes";

export const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api", routes);
