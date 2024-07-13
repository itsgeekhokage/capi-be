/** @format */


import { AppDataSource } from "./typeorm";

const initializeDatabase = () => {
  return AppDataSource.initialize()
    .then(() => {
      console.log("Database connected successfully...");
    })
    .catch((err) => {
      console.error("Error connecting to the database:", err);
      throw err;
    });
};

export default initializeDatabase;
