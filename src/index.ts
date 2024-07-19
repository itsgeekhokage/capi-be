/** @format */
import dotenv from "dotenv";

import "reflect-metadata";
import express from "express";
import cors from "cors";
import version1 from "./routes/v1/v1"

import initializeDatabase from "./db/connect";

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/v1", version1);


initializeDatabase();

app.listen(port, () => {
  console.log("server listening...")
});
