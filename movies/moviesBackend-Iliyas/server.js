import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import express from "express";

// ******************************************************** //

import router from "./routes.js";
import { dbConnect } from "./utils/dbConnect.js";

// ******************************************************** //

const app = express();

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", router);

// ******************************************************** //

const port = process.env.NODE_PORT;

dbConnect()
  .then(() => {
    console.info("[MONGODB_CONNECTION_STATUS] - SUCCESS");
    app.listen(port, () => {
      console.info(`[SERVER_STATUS] - RUNNING`);
      console.info(`[LISTENING_FROM] - http://localhost:${port}`);
    });
  })
  .catch((error) => {
    error && console.log(error.message);
  });
