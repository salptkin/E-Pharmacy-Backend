import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './src/routes/auth.js';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'E-Pharmacy Backend API is running!',
    timestamp: new Date().toISOString(),
  });
});

// API health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'API is healthy',
    database: 'connected',
  });
});

// Test endpoint for debugging
app.post('/api/test', (req, res) => {
  console.log('req.body:', req.body);
  console.log('req.headers:', req.headers);
  res.json({
    message: 'Test endpoint',
    body: req.body,
    headers: req.headers
  });
});

// Mock register endpoint (MongoDB olmadan test için)
app.post('/api/mock-register', (req, res) => {
  console.log('=== MOCK REGISTER DEBUG ===');
  console.log('req.body:', req.body);
  console.log('req.headers:', req.headers);
  console.log('Content-Type:', req.headers['content-type']);
  console.log('========================');
  
  const { name, email, phone, password } = req.body;
  
  if (!name || !email || !phone || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'All fields are required',
      received: req.body
    });
  }
  
  // Mock response
  res.status(201).json({
    user: {
      name,
      email,
      phone
    },
    message: 'Mock registration successful (MongoDB not connected)'
  });
});

// API Routes
app.use('/api', authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal server error',
  });
});

export default app;


