/**
 * Support Controller - Handles patient support request processing
 * 
 * This controller receives validated patient data, delegates
 * AI processing to the service layer, and formats the response.
 */

const aiService = require('../services/aiService');
const { validateSupportRequest } = require('../utils/validators');

/**
 * Handles incoming support requests from patients
 * 
 * @param {Object} req - Express request object containing patient data
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with summary and urgency level
 */
const handleSupportRequest = async (req, res) => {
  try {
    const { name, age, issueCategory, description } = req.body;

    // Validate incoming request data
    const validationError = validateSupportRequest({ name, age, issueCategory, description });
    if (validationError) {
      return res.status(400).json({
        success: false,
        error: validationError
      });
    }

    // Process the patient's issue using AI service
    const aiResponse = await aiService.processPatientIssue({
      name,
      age,
      issueCategory,
      description
    });

    // Return successful response with AI analysis
    return res.status(200).json({
      success: true,
      data: {
        patientName: name,
        category: issueCategory,
        summary: aiResponse.summary,
        urgency: aiResponse.urgency
      }
    });

  } catch (error) {
    console.error('Error processing support request:', error.message);
    
    return res.status(500).json({
      success: false,
      error: 'Failed to process your request. Please try again later.'
    });
  }
};

module.exports = {
  handleSupportRequest
};
