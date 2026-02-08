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
│   │   └── supportController.js    # Request handling logic
│   ├── routes/
│   │   └── supportRoutes.js        # API route definitions
│   ├── services/
│   │   └── aiService.js            # AI/mock processing logic
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
│   │   │   ├── Header.js           # Application header
│   │   │   ├── PatientSupportForm.js # Main form component
│   │   │   └── ResultDisplay.js    # AI results display
│   │   ├── services/
│   │   │   └── api.js              # API communication
│   │   ├── styles/
│   │   │   ├── index.css           # Global styles
│   │   │   ├── App.css
│   │   │   ├── Header.css
│   │   │   ├── PatientSupportForm.css
│   │   │   └── ResultDisplay.css
│   │   ├── App.js                  # Main app component
│   │   └── index.js                # React entry point
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
