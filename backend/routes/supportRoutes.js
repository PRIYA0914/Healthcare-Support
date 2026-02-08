/**
 * Support Routes - API endpoints for patient support requests
 * 
 * Defines the routing layer that connects HTTP endpoints
 * to their corresponding controller functions.
 */

const express = require('express');
const router = express.Router();
const supportController = require('../controllers/supportController');

/**
 * POST /api/support-request
 * 
 * Receives patient support form data and returns:
 * - AI-generated summary of the issue
 * - Urgency classification (Low/Medium/High)
 */
router.post('/support-request', supportController.handleSupportRequest);

module.exports = router;
