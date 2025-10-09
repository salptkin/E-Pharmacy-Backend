import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './src/routes/auth.js';
import cartRoutes from './src/routes/cart.js';
import epharmacyRoutes from './src/routes/epharmacy.js';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'E-Pharmacy Backend API is running!',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'API is healthy',
    database: 'connected',
  });
});
app.use('/api', authRoutes);
app.use('/api', cartRoutes);
app.use('/api', epharmacyRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal server error',
  });
});

export default app;