/**
 * Jarurat Care - NGO Healthcare Support Backend Server
 * 
 * This is the main entry point for the Express server.
 * It handles patient support requests and provides AI-powered
 * issue summarization and urgency classification.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const supportRoutes = require('./routes/supportRoutes');
const { errorHandler, notFoundHandler } = require('./utils/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-frontend-domain.vercel.app' 
    : 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Health check endpoint for deployment verification
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Jarurat Care API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api', supportRoutes);

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Jarurat Care Backend running on port ${PORT}`);
  console.log(`📍 API endpoint: http://localhost:${PORT}/api/support-request`);
});
