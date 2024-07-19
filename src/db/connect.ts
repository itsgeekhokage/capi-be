

import { AppDataSource } from "./typeorm";
import connectMongo from "./mongo";

const initializeDatabase = async () => {
  console.log("here");
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/capi';
    await connectMongo(mongoURI);
    console.log("MongoDB connected successfully...");

    await AppDataSource.initialize();
    console.log("TypeORM connected successfully...");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err;
  }
};

export default initializeDatabase;
