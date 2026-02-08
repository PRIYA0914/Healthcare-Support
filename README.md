# Jarurat Care - NGO Healthcare Support Web Application

![Jarurat Care](https://img.shields.io/badge/NGO-Healthcare%20Support-green)
![React](https://img.shields.io/badge/Frontend-React%2018-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green)
![AI](https://img.shields.io/badge/AI-OpenAI%20%7C%20Mock-orange)

A concept-level healthcare support web application built for **Jarurat Care**, an NGO focused on providing healthcare assistance to underserved communities. This application demonstrates clean architecture, professional code structure, and practical AI integration for patient support request management.

---

## 📋 Project Overview

Jarurat Care's Patient Support Portal enables community members to submit healthcare concerns through a simple, accessible form. The application uses AI to:

1. **Summarize** the patient's issue into a concise, actionable description
2. **Classify urgency** (Low / Medium / High) to help NGO staff prioritize cases

This helps the NGO efficiently triage incoming requests and allocate resources where they're needed most.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 (functional components, hooks) |
| **Backend** | Node.js + Express.js |
| **API Style** | REST |
| **AI** | OpenAI API (GPT-3.5) with rule-based fallback |
| **Styling** | Custom CSS (no frameworks) |
| **Deployment** | Vercel (frontend) + Render (backend) |

---

## 🧠 AI Feature Explanation

### The Problem
NGOs receive numerous patient support requests daily. Manually reading and prioritizing each case is time-consuming and prone to delays in critical situations.

### The Solution
Our AI-powered system automatically:

1. **Generates a Summary**: Creates a concise 1-2 sentence overview of the patient's issue, making it easy for staff to quickly understand each case.

2. **Assigns Urgency Level**:
   - **High**: Life-threatening conditions, emergencies, mental health crises
   - **Medium**: Persistent symptoms, moderate pain, needs attention within 24-48 hours
   - **Low**: Minor concerns, general inquiries, routine follow-ups

### Implementation
The application supports two modes:

#### 1. OpenAI Integration (Production)
When an OpenAI API key is configured, the system uses GPT-3.5 to:
- Understand medical context and terminology
- Generate empathetic, clear summaries
- Make nuanced urgency classifications based on description content

#### 2. Mock AI (Development/Demo)
Without an API key, a rule-based system provides similar functionality:
- Keyword matching for urgency detection
- Template-based summary generation
- Category-aware processing

The mock AI is fully functional and demonstrates where AI would be integrated in production.

---

## 🏥 NGO Use Case

### Why This Matters for Jarurat Care

1. **Resource Optimization**: Staff can focus on high-priority cases first
2. **Faster Response**: Automated triage reduces initial processing time
3. **Accessibility**: Simple form design works on any device, accommodating users with limited tech experience
4. **Transparency**: Clear urgency classifications help set patient expectations

### Example Workflow

1. Patient submits: *"My father (72) has been having severe chest pain and difficulty breathing for the past hour"*

2. AI Analysis:
   - **Summary**: "URGENT: Patient (age 72) requires immediate attention for: severe chest pain and difficulty breathing..."
   - **Urgency**: **High** (detected: chest pain, breathing, elderly patient)

3. NGO staff receives the prioritized request and can respond accordingly

---

## 📁 Project Structure

```
ngo/
├── backend/
│   ├── controllers/
│   │   ├── supportController.js    # Request handling logic
│   │   └── chatbotController.js    # NEW: Chatbot message handling
│   ├── routes/
│   │   ├── supportRoutes.js        # API route definitions
│   │   └── chatbotRoutes.js        # NEW: Chatbot API routes
│   ├── services/
│   │   ├── aiService.js            # AI/mock processing logic
│   │   └── chatbotService.js       # NEW: Rule-based FAQ chatbot
│   ├── utils/
│   │   ├── validators.js           # Input validation
│   │   └── errorHandler.js         # Error handling middleware
│   ├── server.js                   # Express app entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js              # Application header
│   │   │   ├── PatientSupportForm.js  # Main form component
│   │   │   ├── ResultDisplay.js       # AI results display (enhanced)
│   │   │   ├── PriorityBadge.js       # NEW: Color-coded urgency badge
│   │   │   ├── HealthcareDisclaimer.js # NEW: Medical safety notice
│   │   │   ├── FAQAccordion.js        # NEW: FAQ section (chatbot concept)
│   │   │   └── ChatBot.js             # NEW: FAQ chatbot with floating button
│   │   ├── services/
│   │   │   └── api.js                 # API communication
│   │   ├── utils/
│   │   │   └── resultHelpers.js       # NEW: Helper functions
│   │   ├── styles/
│   │   │   ├── index.css              # Global styles
│   │   │   ├── App.css
│   │   │   ├── Header.css
│   │   │   ├── PatientSupportForm.css
│   │   │   ├── ResultDisplay.css      # Enhanced with new feature styles
│   │   │   ├── PriorityBadge.css      # NEW
│   │   │   ├── HealthcareDisclaimer.css # NEW
│   │   │   ├── FAQAccordion.css       # NEW
│   │   │   └── ChatBot.css            # NEW: Chatbot styling
│   │   ├── App.js                     # Main app component (enhanced)
│   │   └── index.js                   # React entry point
│   ├── package.json
│   └── .env.example
│
└── README.md
```

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- (Optional) OpenAI API key for AI features

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# (Optional) Add your OpenAI API key to .env
# OPENAI_API_KEY=your_key_here

# Start the server
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start the React app
npm start
```

The frontend will run on `http://localhost:3000`

### Testing the Application

1. Open `http://localhost:3000` in your browser
2. Fill out the patient support form
3. Submit and view the AI-generated summary and urgency level

---

## 🌐 Live Demo

| Component | URL |
|-----------|-----|
| Frontend | `[Your Vercel URL]` |
| Backend API | `[Your Render URL]` |

*Replace with actual deployment URLs after deployment*

---

## 📡 API Reference

### Health Check
```
GET /api/health
```
Response:
```json
{
  "status": "ok",
  "message": "Jarurat Care API is running",
  "timestamp": "2026-02-08T10:00:00.000Z"
}
```

### Submit Support Request
```
POST /api/support-request
Content-Type: application/json
```

Request Body:
```json
{
  "name": "John Doe",
  "age": 45,
  "issueCategory": "Medical",
  "description": "I have been experiencing persistent headaches for the past week..."
}
```

Response (Success):
```json
{
  "success": true,
  "data": {
    "patientName": "John Doe",
    "category": "Medical",
    "summary": "Patient (age 45) reports a medical concern: persistent headaches for the past week...",
    "urgency": "Medium"
  }
}
```

Response (Error):
```json
{
  "success": false,
  "error": "Description is required and must be at least 10 characters"
}
```

### Chatbot Message
```
POST /api/chatbot/message
Content-Type: application/json
```

Request Body:
```json
{
  "message": "What services do you provide?"
}
```

Response:
```json
{
  "success": true,
  "reply": "Jarurat Care provides: Medical attention coordination, Mental health support, Medication assistance, Emergency healthcare connections...",
  "intent": "services"
}
```

---

## 🔒 Environment Variables

### Backend (.env)
```env
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here  # Optional
NODE_ENV=development
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📦 Deployment Guide

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect repository to Vercel
3. Set build settings:
   - Framework: Create React App
   - Root Directory: `frontend`
4. Add environment variable:
   - `REACT_APP_API_URL`: Your Render backend URL

### Backend (Render)

1. Push your code to GitHub
2. Create new Web Service on Render
3. Set configuration:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables:
   - `OPENAI_API_KEY`: Your OpenAI key (optional)
   - `NODE_ENV`: `production`
5. Update CORS origin in `server.js` with your Vercel URL

---

## ✅ Features Implemented

- [x] Patient Support Request Form
- [x] Input validation (frontend + backend)
- [x] AI-powered issue summarization
- [x] Urgency classification (Low/Medium/High)
- [x] Clean, accessible UI
- [x] Error handling with user-friendly messages
- [x] OpenAI integration with mock fallback
- [x] RESTful API design
- [x] Professional code structure

---

## 🆕 Enhanced Features (Version 2.0)

We've added 7 enterprise-quality features to improve UX, volunteer efficiency, and healthcare responsibility:

### 1. 🎨 Priority Badge with Color Coding

**What it does:** Converts text-based urgency into a visual, color-coded badge.

**Colors:**
- 🟢 **Green** → Low Priority (non-urgent)
- 🟡 **Yellow/Amber** → Medium Priority (needs attention within 24-48 hours)
- 🔴 **Red** → High Priority (requires immediate attention)

**Why it matters for NGO volunteers:**
- Instant visual recognition without reading text
- Traffic-light colors are universally understood
- Reduces cognitive load during triage
- Improves response time for critical cases

---

### 2. 📬 Auto-Acknowledgement Message (Automation)

**What it does:** Automatically generates appropriate response expectations based on urgency level.

**Messages:**
| Urgency | Message |
|---------|---------|
| High | "A volunteer will contact you as soon as possible due to high urgency." |
| Medium | "Your request is under review. You can expect a response within 24–48 hours." |
| Low | "Your request has been queued and will be reviewed shortly." |

**Automation benefits:**
- Reduces manual communication overhead for volunteers
- Sets clear patient expectations immediately
- Ensures consistent messaging across all requests
- Reduces patient anxiety through immediate feedback

---

### 3. ⚕️ Healthcare Emergency Disclaimer

**What it does:** Displays a prominent medical safety notice on every result screen.

**The disclaimer states:**
> "This tool does not replace professional medical advice, diagnosis, or treatment. In case of emergency, please contact local emergency services immediately."

**Why this matters:**
- Healthcare responsibility and compliance awareness
- Protects both the organization and patients
- Ensures users understand this is a support tool, not a diagnostic service
- Encourages seeking professional help for true emergencies

---

### 4. ✏️ Edit Request & Reset Flow

**What it does:** Provides two clear actions after submission:

1. **Edit Request** → Returns to form with pre-filled data for corrections
2. **Submit Another Request** → Clears everything for a fresh form

**UX benefits:**
- No data loss when making corrections
- No page reload required (true SPA experience)
- Clear separation of "form state" and "result state" in React
- Reduces user frustration from re-entering data

---

### 5. 💬 FAQ Section (Chatbot Concept Substitute)

**What it does:** Provides a collapsible FAQ accordion with common questions.

**Included FAQs:**
- What kind of support is provided?
- How long does it take to respond?
- Is my data safe?
- Is this a medical service?

**Why FAQ instead of a full chatbot:**
- Addresses 80% of common questions with minimal complexity
- Instant responses without API calls
- Easy to maintain and update
- Demonstrates the concept without over-engineering
- In production, could be enhanced with AI-powered search

---

### 6. 📊 AI Confidence Indicator

**What it does:** Displays a simulated confidence percentage for the AI analysis.

**Example:** "AI Confidence: 82% (simulated)"

**Important notes:**
- Clearly labeled as "simulated" to avoid medical misinterpretation
- Does NOT imply diagnostic certainty
- Helps users understand AI isn't 100% certain
- In production, would use actual model confidence scores

**How simulation works:**
- Base confidence varies by category (Emergency: 92%, Medical: 78%, Mental Health: 72%, Other: 65%)
- Adjusted by urgency level (High urgency keywords are usually clearer)
- Small random variation for realism (±3%)

---

### 7. 📋 Copy Summary to Clipboard

**What it does:** One-click button to copy the AI summary to clipboard.

**Copied format includes:**
- Patient name
- Category
- Priority level
- Full AI summary

**UX benefits for volunteers:**
- Quick paste into other systems (CRMs, notes, emails)
- Reduces transcription errors
- Immediate visual feedback ("Copied!" confirmation)
- Works across all modern browsers

---

### 8. 🤖 FAQ Chatbot (Full Implementation)

**What it does:** A floating chat button that opens an interactive chatbot for answering common questions.

**Features:**
- **Floating Button**: Always visible "Need Help?" button in bottom-right corner
- **Chat Window**: Clean, professional chat interface
- **Quick Replies**: Pre-defined buttons for common questions
- **Typing Indicator**: Visual feedback while bot is "thinking"
- **Auto-scroll**: Automatically scrolls to new messages
- **Medical Disclaimer**: Safety notice in every response

**Supported Intents (12 total):**
| Intent | Example Questions |
|--------|-------------------|
| Greeting | "Hello", "Hi there" |
| Services | "What do you offer?", "What help is available?" |
| Response Time | "How long for a response?", "When will I hear back?" |
| Medical Service | "Can you diagnose?", "Is this a clinic?" |
| Emergency | "Life-threatening", "Heart attack", "Suicide" |
| Data Safety | "Is my data safe?", "Privacy policy" |
| Volunteer | "How to volunteer?", "Join your team" |
| How to Submit | "How to submit?", "Make a request" |
| Cost | "Is it free?", "How much does it cost?" |
| Mental Health | "Feeling depressed", "Anxiety", "Stress" |
| Thanks | "Thank you", "Thanks" |
| Goodbye | "Bye", "See you" |

**Emergency Detection:**
The chatbot detects emergency keywords and responds with:
> "This sounds like an emergency. Please call your local emergency services immediately. Our support portal is not a substitute for emergency medical care."

**Why this matters:**
- Reduces volunteer workload by answering common questions automatically
- 24/7 availability for basic inquiries
- Consistent, accurate responses
- Professional, accessible interface
- Clear safety boundaries (not medical advice)

---

## 👥 NGO Volunteer Workflow

Here's how these features improve the volunteer experience:

```
1. Patient submits request
   ↓
2. AI processes and returns:
   - Summary (with copy button for easy sharing)
   - Priority Badge (instant visual triage)
   - Confidence Score (transparency about AI certainty)
   ↓
3. Auto-acknowledgement sets patient expectations
   ↓
4. Healthcare disclaimer ensures responsible communication
   ↓
5. Volunteer reviews prioritized queue:
   - Red badges first (immediate action)
   - Yellow badges next (within 24-48 hours)
   - Green badges (queued for review)
   ↓
6. Patient can edit or submit new request as needed
   ↓
7. FAQ section handles common questions automatically
```

---

## ⚠️ Intentionally Not Included

To maintain focus and simplicity, the following features were **not** implemented:

- ❌ User authentication
- ❌ Database integration
- ❌ Admin dashboard
- ❌ Case tracking/history
- ❌ Email notifications

These would be natural additions for a production system.

---

## 🤝 Contributing

This is a concept project, but suggestions are welcome! Please open an issue to discuss proposed changes.

---

## 📄 License

MIT License - Feel free to use this project as a starting point for your own NGO applications.

---

## 🙏 Acknowledgments

Built with care for healthcare accessibility. Special thanks to all NGOs working to bring medical support to underserved communities.

---

**Made with ❤️ for Jarurat Care**
