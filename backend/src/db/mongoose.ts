import mongoose from 'mongoose';
import dotEnv from 'dotenv';
dotEnv.config({ quiet: true });
const mongoUri = process.env.DATABASE_URL || 'mongodb://localhost:27017/stockmarketdb';

export const connectDb = async () => {
  try {
    await mongoose.connect(mongoUri, {});
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    throw err;
  }
};

export default mongoose;
