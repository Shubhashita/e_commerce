const mongoose = require("mongoose");

const mongoDBConfig = async () => {
  try {
    // List of common environment variable names for MongoDB URI
    const mongoURI = process.env.MONGODB_URI ||
      process.env.MONGO_URL ||
      process.env.DATABASE_URL ||
      process.env.MONGODB_URL;

    if (!mongoURI) {
      console.error("❌ ERROR: MongoDB connection URI is missing!");
      console.error("Please ensure you have set 'MONGODB_URI' in your Render Environment Variables.");
      process.exit(1);
    }

    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    const conn = await mongoose.connect(mongoURI, options);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📂 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = mongoDBConfig;
