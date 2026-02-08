/**
 * Chatbot Routes - API endpoints for the chatbot feature
 * 
 * Provides a simple message endpoint for the FAQ/guidance chatbot.
 * This chatbot is a SUPPORT TOOL, not a medical advisor.
 */

const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');

/**
 * POST /api/chatbot/message
 * 
 * Receives a user message and returns the chatbot's response.
 * 
 * Request Body:
 * {
 *   message: string - The user's question or message
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   reply: string - The chatbot's response
 * }
 */
router.post('/message', chatbotController.handleChatMessage);

module.exports = router;
