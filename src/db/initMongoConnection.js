import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_DB = process.env.MONGODB_DB;
const MONGODB_OPTIONS = process.env.MONGODB_OPTIONS;

// Debug: MongoDB environment variables
console.log('=== MONGODB DEBUG ===');
console.log('MONGODB_USER:', MONGODB_USER ? 'SET' : 'NOT SET');
console.log('MONGODB_PASSWORD:', MONGODB_PASSWORD ? 'SET' : 'NOT SET');
console.log('MONGODB_URL:', MONGODB_URL ? 'SET' : 'NOT SET');
console.log('MONGODB_DB:', MONGODB_DB ? 'SET' : 'NOT SET');
console.log('====================');

// Local MongoDB için URI oluştur
let MONGODB_URI;
if (MONGODB_USER && MONGODB_PASSWORD) {
  // MongoDB Atlas (cloud)
  MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}${
    MONGODB_OPTIONS ? `?${MONGODB_OPTIONS}` : ''
  }`;
} else {
  // Local MongoDB
  MONGODB_URI = `mongodb://${MONGODB_URL}/${MONGODB_DB}`;
}

const connectToMongoDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectToMongoDB;