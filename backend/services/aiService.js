/**
 * AI Service - Processes patient issues using AI/rule-based logic
 * 
 * This service provides two modes:
 * 1. OpenAI Integration: Uses GPT for intelligent summarization
 * 2. Mock AI: Rule-based fallback when OpenAI key is not available
 * 
 * For production NGO deployment, OpenAI integration provides:
 * - More accurate medical context understanding
 * - Better urgency classification based on nuanced language
 * - Natural language summaries that are empathetic and clear
 */

const OpenAI = require('openai');

// Initialize OpenAI client if API key is available
const openai = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here'
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

/**
 * Processes patient issue and returns summary + urgency level
 * 
 * @param {Object} patientData - Patient information from the form
 * @returns {Object} { summary: string, urgency: "Low" | "Medium" | "High" }
 */
const processPatientIssue = async (patientData) => {
  // Use OpenAI if available, otherwise fall back to mock AI
  if (openai) {
    return await processWithOpenAI(patientData);
  }
  return processWithMockAI(patientData);
};

/**
 * OpenAI-powered issue processing
 * 
 * Uses GPT to generate empathetic summaries and accurate urgency classification.
 * The prompt is carefully designed for healthcare/NGO context.
 */
const processWithOpenAI = async (patientData) => {
  const { name, age, issueCategory, description } = patientData;

  const prompt = `You are a healthcare support assistant for an NGO called "Jarurat Care" that helps underserved communities.

Analyze this patient support request:
- Patient Age: ${age} years
- Category: ${issueCategory}
- Issue Description: ${description}

Provide a response in exactly this JSON format:
{
  "summary": "A concise 1-2 sentence summary of the patient's issue in simple, empathetic language",
  "urgency": "Low" OR "Medium" OR "High"
}

Urgency Guidelines:
- HIGH: Life-threatening, severe pain, mental health crisis, emergency situations, elderly with acute symptoms
- MEDIUM: Persistent symptoms, moderate pain, recurring issues, needs attention within 24-48 hours
- LOW: Minor concerns, routine checkups, general inquiries, non-urgent follow-ups

Respond ONLY with the JSON object, no additional text.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3, // Lower temperature for consistent classification
      max_tokens: 200
    });

    const content = response.choices[0].message.content.trim();
    const parsed = JSON.parse(content);

    return {
      summary: parsed.summary,
      urgency: validateUrgency(parsed.urgency)
    };
  } catch (error) {
    console.error('OpenAI processing error:', error.message);
    // Fallback to mock AI if OpenAI fails
    return processWithMockAI(patientData);
  }
};

/**
 * Mock AI - Rule-based issue processing
 * 
 * This provides a structured fallback when OpenAI is not available.
 * In production, this would be replaced with actual AI integration.
 * 
 * LOGIC EXPLANATION:
 * 1. Urgency is determined by keyword matching and category analysis
 * 2. Summary is generated using template-based approach
 * 3. Age is factored in (elderly patients get higher urgency consideration)
 */
const processWithMockAI = (patientData) => {
  const { name, age, issueCategory, description } = patientData;
  const lowerDescription = description.toLowerCase();

  // Determine urgency based on keywords and category
  const urgency = calculateUrgency(lowerDescription, issueCategory, age);
  
  // Generate summary based on category and description
  const summary = generateSummary(issueCategory, description, age);

  return { summary, urgency };
};

/**
 * Calculates urgency level based on multiple factors
 * 
 * RULE-BASED LOGIC:
 * - HIGH: Emergency keywords, mental health crisis indicators, elderly acute cases
 * - MEDIUM: Moderate severity keywords, persistent symptoms
 * - LOW: General health queries, minor symptoms
 */
const calculateUrgency = (description, category, age) => {
  // HIGH urgency keywords - immediate attention needed
  const highUrgencyKeywords = [
    'emergency', 'severe', 'unbearable', 'chest pain', 'breathing',
    'suicide', 'blood', 'accident', 'unconscious', 'heart attack',
    'stroke', 'poisoning', 'overdose', 'collapse', 'seizure',
    'not breathing', 'dying', 'critical', 'urgent', 'immediately'
  ];

  // MEDIUM urgency keywords - attention within 24-48 hours
  const mediumUrgencyKeywords = [
    'fever', 'pain', 'infection', 'swelling', 'persistent',
    'recurring', 'anxiety', 'depression', 'stress', 'chronic',
    'medication', 'worsening', 'concerning', 'trouble sleeping',
    'loss of appetite', 'weakness', 'dizzy', 'nausea'
  ];

  // Check for HIGH urgency conditions
  const hasHighUrgency = highUrgencyKeywords.some(keyword => 
    description.includes(keyword)
  );
  
  // Emergency category is always high priority
  if (hasHighUrgency || category === 'Emergency') {
    return 'High';
  }

  // Check for MEDIUM urgency conditions
  const hasMediumUrgency = mediumUrgencyKeywords.some(keyword => 
    description.includes(keyword)
  );

  // Mental health category defaults to at least medium
  // Elderly patients (65+) with symptoms get elevated urgency
  if (hasMediumUrgency || category === 'Mental Health' || (age >= 65 && description.length > 30)) {
    return 'Medium';
  }

  // Default to LOW urgency
  return 'Low';
};

/**
 * Generates a concise summary of the patient's issue
 * 
 * Uses category-specific templates combined with issue extraction
 * to provide clear, empathetic summaries for NGO staff.
 */
const generateSummary = (category, description, age) => {
  // Extract key issue from description (first sentence or meaningful phrase)
  const issuePreview = description.length > 100 
    ? description.substring(0, 100).trim() + '...'
    : description;

  // Category-specific summary templates
  const summaryTemplates = {
    'Medical': `Patient (age ${age}) reports a medical concern: ${issuePreview}`,
    'Mental Health': `Patient (age ${age}) is seeking mental health support regarding: ${issuePreview}`,
    'Emergency': `URGENT: Patient (age ${age}) requires immediate attention for: ${issuePreview}`,
    'Other': `Patient (age ${age}) has submitted a support request: ${issuePreview}`
  };

  return summaryTemplates[category] || summaryTemplates['Other'];
};

/**
 * Ensures urgency value is valid
 * Prevents any unexpected values from AI response
 */
const validateUrgency = (urgency) => {
  const validUrgencies = ['Low', 'Medium', 'High'];
  return validUrgencies.includes(urgency) ? urgency : 'Medium';
};

module.exports = {
  processPatientIssue
};
