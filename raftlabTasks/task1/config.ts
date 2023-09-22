import dotEnv from "dotenv";

if (process.env.NODE_ENV === "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

export default {
  port: process.env.NODE_PORT,
  environment: process.env.NODE_ENV,
};
