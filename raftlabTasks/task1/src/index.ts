import cors from "cors";
import morgan from "morgan";
import express from "express";
import path, { join } from "path";
import { readFileSync } from "fs";
import compression from "compression";
import { Express } from "express-serve-static-core";

// GraphQL Dependencies
import gql from "graphql-tag";
import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginInlineTraceDisabled } from "@apollo/server/plugin/disabled";

import config from "../config";
import resolvers from "./graphql/resolvers";
import dbConnector from "./utils/dbConnector";
import tokenMiddleware from "./middlewares/token.middleware";

const app = express();

const extraConfig = async (app: Express) =>
  new Promise(async (resolve, reject) => {
    const __dirname = path.resolve();

    app.use(cors());
    app.use(compression());
    app.use(morgan("dev"));
    app.use(express.json());

    try {
      const typeDefs = gql(
        readFileSync(join(__dirname, "/src/graphql/schema.graphql"), {
          encoding: "utf-8",
        })
      );
      const server = new ApolloServer({
        schema: buildSubgraphSchema({
          typeDefs,
          resolvers,
        }),
        plugins: [ApolloServerPluginInlineTraceDisabled()],
      });
      await server.start();

      app.use(
        "/graphql",
        tokenMiddleware,
        expressMiddleware(server, {
          context: async ({ req }) => ({ token: req.context.token }),
        })
      );
      resolve(true);
    } catch (error) {
      console.log("[GRAPHQL-ERROR] - ", error.message);
      reject(error);
    }
  });

dbConnector()
  .then(() => {
    extraConfig(app);
  })
  .catch((error) => {
    console.log("[DATABASE-ERROR] - ", error.message);
  });

app
  .listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
    console.log(`Environment: ${config.environment || "development"}`);
    console.log(`Server started at: ${new Date()}`);
    console.log("Press Ctrl+C to stop the server.");
  })
  .on("error", (error) => {
    console.log("[SERVER-ERROR] - ", error.message);
    process.exit();
  });
