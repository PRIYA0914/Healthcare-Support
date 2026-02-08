/**
 * Chatbot Service - Rule-based FAQ Chatbot for NGO Healthcare Support
 * 
 * PURPOSE:
 * This chatbot provides guidance and answers common questions for patients
 * seeking support from Jarurat Care NGO. It is NOT a medical advisor.
 * 
 * IMPORTANT HEALTHCARE RESPONSIBILITY NOTES:
 * - This chatbot NEVER provides medical diagnoses
 * - This chatbot NEVER suggests specific treatments or medications
 * - This chatbot ALWAYS recommends consulting healthcare professionals
 * - Emergency keywords trigger immediate safety disclaimers
 * 
 * WHY RULE-BASED APPROACH:
 * - Predictable, safe responses
 * - No risk of AI hallucination for medical topics
 * - Easy to audit and maintain
 * - Fully compliant with healthcare communication guidelines
 * 
 * FUTURE ENHANCEMENT:
 * In production, this could be enhanced with OpenAI using a strict
 * system prompt that prevents medical advice while allowing more
 * natural conversation flow.
 */

/**
 * Emergency keywords that require immediate safety disclaimer
 * These words indicate potentially life-threatening situations
 */
const EMERGENCY_KEYWORDS = [
  'emergency', 'dying', 'suicide', 'suicidal', 'kill myself',
  'heart attack', 'stroke', 'overdose', 'bleeding heavily',
  'can\'t breathe', 'cannot breathe', 'unconscious', 'seizure',
  'chest pain', 'severe pain', 'accident', 'poisoning'
];

/**
 * FAQ Intents - Predefined questions and responses
 * 
 * Each intent contains:
 * - keywords: Words that trigger this response
 * - response: The safe, informative reply
 * 
 * All responses are designed to:
 * - Be calm and reassuring
 * - Provide helpful information
 * - Avoid medical advice
 * - Direct to appropriate resources
 */
const FAQ_INTENTS = [
  {
    id: 'greeting',
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'namaste'],
    response: `Hello! Welcome to Jarurat Care. I'm here to help answer your questions about our healthcare support services. How can I assist you today?`
  },
  {
    id: 'services',
    keywords: ['what support', 'what services', 'what do you provide', 'what help', 'what can you do', 'how can you help'],
    response: `Jarurat Care provides healthcare support services including:

• Medical support coordination - connecting you with healthcare resources
• Mental health support referrals
• Emergency assistance guidance
• Follow-up care coordination

We help connect patients with appropriate healthcare providers and support their care journey. Please note: We are a support service, not a medical provider.`
  },
  {
    id: 'response_time',
    keywords: ['how long', 'when will', 'response time', 'wait time', 'how fast', 'when can i expect'],
    response: `Our response times depend on the urgency of your request:

• High Priority: As soon as possible (typically within hours)
• Medium Priority: Within 24-48 hours
• Low Priority: Within 3-5 business days

A volunteer will review your request and reach out based on the priority level assigned by our system.`
  },
  {
    id: 'medical_service',
    keywords: ['medical service', 'doctor', 'diagnose', 'diagnosis', 'prescribe', 'medicine', 'treatment', 'medical advice'],
    response: `Important: Jarurat Care is a support coordination service, NOT a medical provider.

We cannot:
• Diagnose medical conditions
• Prescribe medications
• Provide medical treatment

We CAN help connect you with qualified healthcare professionals in your area. For medical concerns, please consult a licensed healthcare provider.`
  },
  {
    id: 'emergency',
    keywords: EMERGENCY_KEYWORDS,
    response: `⚠️ IMPORTANT: If you are experiencing a medical emergency, please contact emergency services IMMEDIATELY.

• India Emergency: 112
• Ambulance: 102
• Health Helpline: 104

This chatbot cannot provide emergency medical assistance. Please do not wait - call emergency services right away.

If this is not an emergency, a volunteer will review your support request and reach out to you.`
  },
  {
    id: 'data_safety',
    keywords: ['data safe', 'privacy', 'confidential', 'secure', 'who sees', 'share my information'],
    response: `Your privacy is important to us. Here's how we handle your data:

• Information is only used to process your support request
• Trained volunteers handle your case under strict confidentiality
• We do not share personal health information with third parties without consent
• Data is stored securely and accessed only by authorized personnel

For detailed privacy information, please contact our support team.`
  },
  {
    id: 'volunteer',
    keywords: ['volunteer', 'who helps', 'who responds', 'staff', 'team'],
    response: `Our support is provided by trained volunteers who:

• Understand healthcare coordination
• Follow strict confidentiality guidelines
• Are supervised by experienced coordinators
• Care about helping underserved communities

They will review your request and help connect you with appropriate resources.`
  },
  {
    id: 'how_to_submit',
    keywords: ['submit', 'request', 'form', 'how to apply', 'how to get help', 'fill out'],
    response: `To submit a support request:

1. Fill out the Patient Support Form on our portal
2. Provide your name, age, and issue category
3. Describe your healthcare concern in detail
4. Click "Submit Request"

Our AI system will analyze your request, assign a priority level, and a volunteer will follow up based on urgency.`
  },
  {
    id: 'cost',
    keywords: ['cost', 'fee', 'charge', 'price', 'payment', 'free', 'money'],
    response: `Jarurat Care is an NGO providing FREE healthcare support coordination services.

We do not charge for:
• Reviewing your support request
• Connecting you with resources
• Follow-up coordination

Note: Actual medical services from healthcare providers may have their own costs. We help connect you but cannot cover medical expenses.`
  },
  {
    id: 'mental_health',
    keywords: ['mental health', 'anxiety', 'depression', 'stress', 'counseling', 'therapy', 'sad', 'worried'],
    response: `Mental health is just as important as physical health. Jarurat Care can help connect you with:

• Mental health support resources
• Counseling service referrals
• Crisis helpline information

If you're struggling, you're not alone. Please submit a support request under "Mental Health" category, and a volunteer will reach out.

For immediate crisis support:
• iCall: 9152987821
• Vandrevala Foundation: 1860-2662-345`
  },
  {
    id: 'thanks',
    keywords: ['thank', 'thanks', 'thank you', 'appreciate'],
    response: `You're welcome! We're here to help. If you have any more questions or need support, feel free to ask or submit a support request through our form. Take care! 💚`
  },
  {
    id: 'bye',
    keywords: ['bye', 'goodbye', 'see you', 'take care'],
    response: `Take care! Remember, we're here whenever you need support. Don't hesitate to reach out. Wishing you good health! 💚`
  }
];

/**
 * Default response when no intent matches
 * This ensures we never leave the user without a response
 */
const DEFAULT_RESPONSE = `I understand you have a question. While I may not have a specific answer for that, here's what I can help with:

• Information about our support services
• How to submit a request
• Response time expectations
• Data privacy questions
• Mental health resources

For specific healthcare concerns, please submit a support request through our form, and a volunteer will review your case personally.

Is there something else I can help you with?`;

/**
 * Safety disclaimer shown with all responses
 * This ensures responsible healthcare communication
 */
const SAFETY_DISCLAIMER = `\n\n---\n_Disclaimer: This chatbot provides general guidance only. It does not provide medical advice, diagnosis, or treatment. For medical concerns, please consult a healthcare professional._`;

/**
 * Checks if message contains emergency keywords
 * 
 * Emergency detection is critical for patient safety.
 * When emergencies are detected, we immediately direct users
 * to professional emergency services.
 * 
 * @param {string} message - User's message
 * @returns {boolean} True if emergency keywords found
 */
const containsEmergencyKeywords = (message) => {
  const lowerMessage = message.toLowerCase();
  return EMERGENCY_KEYWORDS.some(keyword => 
    lowerMessage.includes(keyword.toLowerCase())
  );
};

/**
 * Finds the best matching intent for a user message
 * 
 * Uses simple keyword matching for predictable, safe responses.
 * Rule-based approach ensures we never accidentally provide
 * inappropriate medical advice.
 * 
 * @param {string} message - User's message
 * @returns {Object|null} Matching intent or null
 */
const findMatchingIntent = (message) => {
  const lowerMessage = message.toLowerCase();
  
  // Check for emergency first - highest priority
  if (containsEmergencyKeywords(message)) {
    return FAQ_INTENTS.find(intent => intent.id === 'emergency');
  }
  
  // Find best matching intent by keyword count
  let bestMatch = null;
  let bestScore = 0;
  
  for (const intent of FAQ_INTENTS) {
    // Skip emergency intent (already checked above)
    if (intent.id === 'emergency') continue;
    
    // Count matching keywords
    const matchCount = intent.keywords.filter(keyword =>
      lowerMessage.includes(keyword.toLowerCase())
    ).length;
    
    if (matchCount > bestScore) {
      bestScore = matchCount;
      bestMatch = intent;
    }
  }
  
  return bestMatch;
};

/**
 * Processes a user message and returns appropriate response
 * 
 * This is the main entry point for chatbot logic.
 * 
 * HEALTHCARE RESPONSIBILITY:
 * - Every response is carefully crafted to be safe
 * - We never provide medical diagnoses or treatment advice
 * - We always encourage consulting healthcare professionals
 * - A safety disclaimer is appended to all responses
 * 
 * @param {string} userMessage - The message from the user
 * @returns {Object} Response object with reply text
 */
const processMessage = async (userMessage) => {
  // Validate input
  if (!userMessage || typeof userMessage !== 'string') {
    return {
      reply: `I didn't receive a message. How can I help you today?${SAFETY_DISCLAIMER}`
    };
  }
  
  const trimmedMessage = userMessage.trim();
  
  // Handle empty messages
  if (trimmedMessage.length === 0) {
    return {
      reply: `Please type a message so I can assist you.${SAFETY_DISCLAIMER}`
    };
  }
  
  // Find matching intent
  const matchedIntent = findMatchingIntent(trimmedMessage);
  
  // Return matched response or default
  const response = matchedIntent 
    ? matchedIntent.response 
    : DEFAULT_RESPONSE;
  
  return {
    reply: `${response}${SAFETY_DISCLAIMER}`
  };
};

module.exports = {
  processMessage
};
