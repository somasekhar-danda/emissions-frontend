# 🌍 Emissions Insight Dashboard — Frontend  
### Stride Labs HackForward 2025 — Round 2  
**By: Somasekhar Reddy Danda**

---

## 🚀 Overview

This is the **frontend** of the *Emissions Insight Dashboard* built for  
**Stride Labs HackForward 2025 – Round 2**.

The UI provides:
- Interactive summary cards  
- Year & sector filtering  
- Trend charts  
- Emissions table  
- A responsive AI-powered chat interface  
- Smooth, intuitive user experience  

The dashboard consumes REST APIs from the backend (Railway deployment).

---

## ✨ Features

### 📊 Dashboard
- Summary metrics (total, highest sector, averages)
- Year and sector filters  
- Trend visualization using Chart.js / Recharts  
- Emissions table  
- Sector summary & trend summary cards  

### 🤖 Chat Assistant
- Natural-language questions  
- Uses backend-powered AI responses  
- Provides quick replies  
- Generates table/chart responses when available  

### 🎨 UI/UX
- Clean dark theme  
- Sidebar chat layout  
- Responsive grid design  
- Component-based architecture  

---

## 🛠️ Tech Stack

- **React (CRA)**  
- **Recharts + Chart.js**  
- **Custom components**  
- **Vercel deployment**  

---

## 🌐 Live Deployment

Frontend URL:  
👉 https://emissions-frontend.vercel.app

Backend URL (API):  
👉 https://emissions-backend-production.up.railway.app

---

## 🧩 Project Structure
emissions-frontend/
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── api/
│   │   └── api.js                # All backend API calls (summary, trend, chat, sectors, years)
│   │
│   ├── components/
│   │   ├── Header.jsx            # Dashboard header (title + user info area)
│   │   ├── FiltersBar.jsx        # Dropdown filters for year + sector
│   │   ├── SummaryCards.jsx      # Dashboard metric cards
│   │   ├── EmissionsTable.jsx    # Data table
│   │   ├── EmissionsCharts.jsx   # Trend charts (Recharts / Chart.js)
│   │   ├── ChatPanel.jsx         # Full chat UI with message list + input
│   │   ├── QuickReplies.jsx      # Auto-generated reply suggestions
│   │   ├── TableRenderer.jsx     # Chat → table response renderer
│   │   └── ChartRenderer.jsx     # Chat → chart response renderer
│   │
│   ├── pages/
│   │   └── Dashboard.jsx         # Full layout (header + left panel + chat panel)
│   │
│   ├── styles/                   # Optional shared styles
│   │   └── global.css
│   │
│   ├── App.js                    # Entry: routing + app-level state
│   ├── index.js                  # React DOM rendering
│   └── setupTests.js             # CRA test environment
│
├── .env                          # REACT_APP_API_BASE_URL
├── package.json
├── package-lock.json
├── README.md
└── .gitignore

## 🔗 API Integration

All API calls use:

```js
const API_BASE_URL = "https://emissions-backend-production.up.railway.app";

Endpoints used:

/api/emissions/years
/api/emissions/sectors
/api/emissions/summary
/api/emissions/trend
/api/emissions/sectorSummary
/api/emissions/trendSummary
/api/chat
🧪 Running Locally
Copy code
Bash
npm install
npm start
Frontend runs at:
Copy code

http://localhost:3000
🗂️ Build & Deploy
To deploy on Vercel:
Copy code

npm run build
Vercel automatically detects CRA and deploys to production.
