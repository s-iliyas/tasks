import cors from "cors";
import morgan from "morgan";
import express from "express";
import compression from "compression";

import config from "../config";

const app = express();

app.use(cors());
app.use(compression());
app.use(morgan("dev"));

app
  .listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
    console.log(`Environment: ${config.environment || "development"}`);
    console.log(`Server started at: ${new Date()}`);
    console.log("Press Ctrl+C to stop the server.");
  })
  .on("error", (error) => {
    console.log("Error occurred in server", error);
    process.exit();
  });
