import mongoose from "mongoose";

const MONGODB_URL = process.env.CONNECTION_STRING!;

if (!MONGODB_URL) throw new Error("MongoDB url missing")

let isConnected = false;

const connectDB = async () => {
  try {

    if (isConnected) {
      return;
    }
    await mongoose
      .connect(MONGODB_URL)
    const connection = mongoose.connection;

    connection.on('connected', () => {
      isConnected = true;
      console.log('Database connected...');
    })
    connection.on('error', (err) => {
      console.log('database connection error' + err)
      process.exit()
    })
  } catch (error) {
    console.log('something wrong in mongodb connection');
    console.log(error);
  }
};

export default connectDB;