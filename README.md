# 💰 FinSight

### Personal Finance Analytics & Expense Forecasting Platform

FinSight is a full-stack personal finance application built using the **MERN stack**. It helps users track income and expenses, manage monthly budgets, analyze spending patterns, and predict future expenses using historical financial data.

🔗 **[Live Project](https://finsightfinancedashboard.netlify.app/)**

---

## ✨ Features

- 🔐 Secure user authentication using JWT
- 💳 Add and delete income and expense transactions
- 💰 Real-time income, expense, and balance calculation
- 🎯 Category-wise monthly budget management
- 📊 Category-based expense analysis
- 📈 Monthly income and expense visualization
- 🧠 Personalized financial insights
- 🔮 Next-month expense prediction
- 📉 Interactive charts using Chart.js

---

## 🏗️ System Architecture

```text
👤 User
   ↓
⚛️ React Frontend
   ↓
🔗 Axios / REST API
   ↓
🚀 Node.js + Express.js
   ↓
🗄️ MongoDB Atlas
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JWT, bcryptjs |
| API Communication | Axios |
| Data Visualization | Chart.js |
| Prediction | Simple Linear Regression |
| Deployment | Netlify, Render |

---

## 🔮 Expense Prediction

FinSight uses **Simple Linear Regression** to estimate the user's next-month expenses based on historical monthly spending.

```text
Historical Expenses
        ↓
Group Expenses by Month
        ↓
Calculate Monthly Totals
        ↓
Analyze Spending Trend
        ↓
Apply Linear Regression
        ↓
Predict Next-Month Expense
```

---

## ⚙️ How It Works

1. The user registers or logs in to FinSight.
2. JWT authentication protects user-specific financial data.
3. Income and expense transactions are stored in MongoDB Atlas.
4. The backend processes financial data using REST APIs.
5. Analytics services calculate category-wise and monthly spending trends.
6. Financial insights are generated from transaction and budget data.
7. The prediction module estimates the next month's expenses.
8. Results are displayed on the React dashboard.

---

## 🔌 API Modules

| Module | Endpoint | Purpose |
|---|---|---|
| Authentication | `/api/auth` | User registration and login |
| Transactions | `/api/transactions` | Manage financial transactions |
| Budgets | `/api/budgets` | Manage monthly budgets |
| Analytics | `/api/analytics` | Generate financial analytics |
| Insights | `/api/insights` | Generate financial insights |
| Predictions | `/api/predictions` | Generate expense predictions |

---

## 🌐 Live Project

👉 **[Open FinSight](https://finsightfinancedashboard.netlify.app/)**

---

<div align="center">

### 💰 Track. Analyze. Predict.

**FinSight — Understand your finances through data.**

</div>