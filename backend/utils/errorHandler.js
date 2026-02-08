/**
 * Error Handler - Centralized error handling utilities
 * 
 * Provides consistent error responses across the application
 * and handles both expected and unexpected errors gracefully.
 */

/**
 * Handles 404 Not Found errors for undefined routes
 */
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.originalUrl} not found`
  });
};

/**
 * Global error handler middleware
 * 
 * Catches all unhandled errors and returns appropriate responses.
 * In development, includes error details; in production, keeps them hidden.
 */
const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Error:', err.message);

  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'An unexpected error occurred'
    : err.message;

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};
