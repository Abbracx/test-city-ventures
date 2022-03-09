import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

// set environment variables
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;

//set connection string

const URI = `${DB_HOST}:${DB_PASSWORD}@blogcluster.kucm3.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
export const db_connector = async (): Promise<void> => {
  try {
    await mongoose.connect(URI);
    console.log("✅ Database connected successfully...");
  } catch (error) {
    throw error;
  }
};
