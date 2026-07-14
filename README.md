# 💰 FinSight – Intelligent Personal Finance Dashboard

## 📌 About the Project

FinSight is a full-stack personal finance analytics platform built using
the MERN stack.

The application helps users manage income and expenses, track monthly
budgets, analyze spending patterns, and forecast future expenses using
historical financial data.

The project combines full-stack web development, REST API integration,
financial analytics, and Simple Linear Regression-based expense
forecasting.

---

## 🚀 Key Features

- Secure user registration and login using JWT authentication
- Add and manage income and expense transactions
- Real-time calculation of total income, expenses, and balance
- Category-wise monthly budget management
- Category-based expense analysis
- Monthly income and expense trend visualization
- Personalized financial insights based on spending data
- Next-month expense prediction using Simple Linear Regression
- Interactive financial charts using Chart.js
- Responsive financial dashboard

---

## 🧠 Expense Prediction

FinSight analyzes historical monthly expense data and applies
Simple Linear Regression to estimate the expected expense for the
next month.

The prediction workflow:

1. Retrieves the user's historical expense transactions
2. Groups expenses by month
3. Calculates total monthly spending
4. Applies Linear Regression to identify the spending trend
5. Predicts the expected expense for the next month

This feature integrates basic predictive analytics into the MERN
application.

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Axios
- React Router
- Chart.js

### Backend

- Node.js
- Express.js
- REST APIs
- JWT Authentication
- bcryptjs

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Deployment

- Netlify
- Render
- MongoDB Atlas

---

## 🏗️ System Architecture

```text
User
  ↓
React Frontend
  ↓
Axios REST API Requests
  ↓
Node.js + Express Backend
  ↓
Mongoose
  ↓
MongoDB Atlas
⚙️ How It Works
The user registers or logs into FinSight.
JWT authentication protects user-specific financial data.
Users add income and expense transactions.
Transaction data is stored in MongoDB Atlas.
The backend aggregates financial data using REST APIs.
React displays financial summaries and interactive charts.
The insight module analyzes spending and budget information.
The prediction service forecasts the next month's expenses.
🔐 Authentication & Security
Password hashing using bcryptjs
JWT-based authentication
Protected backend API routes
User-specific financial data access
Environment variables for sensitive credentials
🌐 Deployment

The application is deployed using a cloud-based architecture.

Frontend: Netlify

Backend: Render

Database: MongoDB Atlas

🔗 Live Demo

👉 https://finsightfinancedashboard.netlify.app/

💻 Source Code

👉 https://github.com/tanmayi48/finsight-finance-dashboard

📸 Project Preview
Login Page

Add login page screenshot here.

Financial Dashboard

Add dashboard screenshot here.

Analytics & Expense Prediction

Add analytics and prediction screenshot here.

🚀 Future Improvements
Savings goal tracking
Recurring transaction management
Advanced expense forecasting models
Spending anomaly detection
Financial report export
Email-based budget notifications
👩‍💻 Developed By

Tanmayi P

Information Science and Engineering Student

GitHub: https://github.com/tanmayi48
