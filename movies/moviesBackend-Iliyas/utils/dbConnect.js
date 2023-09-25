import mongoose from "mongoose";

export const dbConnect = () =>
  new Promise(async (resolve, reject) => {
    try {
      await mongoose.connect(process.env.DATABASE_URL);
      resolve();
    } catch (error) {
      console.log("[MONGODB_CONNECTION_ERROR] - ", error.message);
      reject();
    }
  });
