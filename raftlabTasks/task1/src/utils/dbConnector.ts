import mongoose from "mongoose";
import config from "../../config";

const dbConnector = () =>
  new Promise(async (resolve, reject) => {
    mongoose
      .connect(config.MONGO_DB_URL)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });

export default dbConnector;
