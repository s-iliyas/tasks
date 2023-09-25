import dotEnv from "dotenv";

if (process.env.NODE_ENV === "production") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

export default {
  port: process.env.NODE_PORT,
  environment: process.env.NODE_ENV,
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  SECRET_KEY: process.env.SECRET_KEY,
};
