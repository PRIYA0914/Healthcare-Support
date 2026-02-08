// Trigger redeploy for Render
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
const chatbotRoutes = require('./routes/chatbotRoutes');
const { errorHandler, notFoundHandler } = require('./utils/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Configuration
// Enable CORS for all origins (safe for public API, adjust as needed)
app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));
app.use(express.json());

// Health check endpoint for deployment verification
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// API Routes
app.use('/api', supportRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
