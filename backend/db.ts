import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("MONGODB_URI is not defined in the environment variables");
}

// MongoDB Connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectToDatabase;
