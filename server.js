import dotenv from 'dotenv';
import app from './app.js';
import connectToMongoDB from './src/db/initMongoConnection.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// Start server function
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectToMongoDB();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 Access the API at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

// Start the server
startServer();


