import mongoose from "mongoose";

const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database error:", error.message);
  }
};

export default dbconnect;