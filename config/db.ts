import mongoose from "mongoose";

import { config } from "dotenv";
config()

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DATABASE_URI as string);
    console.log('db connected')
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
