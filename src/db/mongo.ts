/** @format */

import mongoose from "mongoose";

const connectMongo = async (DATABASE_URL : string) => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("database connected successfully...");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongo;
