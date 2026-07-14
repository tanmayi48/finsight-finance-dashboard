# 💰 FinSight

### Personal Finance Analytics & Expense Forecasting Platform

::: {align="center"}
A full-stack finance dashboard for tracking, analyzing, and predicting
personal expenses.

**[Live Demo](https://finsightfinancedashboard.netlify.app/) · [GitHub
Repository](https://github.com/tanmayi48/finsight-finance-dashboard)**
:::

------------------------------------------------------------------------

## 💡 What is FinSight?

FinSight is a full-stack personal finance analytics platform designed to
help users track income, monitor expenses, manage monthly budgets, and
understand spending patterns through interactive financial
visualizations.

Unlike a basic expense tracker, FinSight analyzes transaction history,
generates financial insights, and estimates future expenses using
historical spending trends.

> 💡 **Track smarter. Understand your spending. Plan your finances
> better.**

``` text
👤 User adds transactions
        ↓
💳 FinSight stores financial data
        ↓
📊 Backend analyzes spending patterns
        ↓
🧠 Financial insights are generated
        ↓
📈 Future expenses are predicted
        ↓
💰 Dashboard displays financial overview
```

------------------------------------------------------------------------

## ✨ Feature Highlights

  ---------------------------------------------------------------------
  🚀 Feature                         📝 Description
  ---------------------------------- ----------------------------------
  🔐 Secure Authentication           JWT-based user registration and
                                     login

  💳 Transaction Management          Add and manage income and expense
                                     transactions

  💰 Financial Overview              View total income, total expenses,
                                     and current balance

  🎯 Budget Management               Set category-wise monthly spending
                                     limits

  📊 Expense Analytics               Analyze category-wise expense
                                     distribution

  📈 Monthly Trends                  Compare monthly income and expense
                                     patterns

  🧠 Financial Insights              Generate observations based on
                                     spending activity

  🔮 Expense Forecasting             Predict next-month expenses using
                                     historical trends

  📉 Interactive Charts              Visualize financial data using
                                     Chart.js

  ☁️ Cloud Deployment A              ccess the deployed full-stack
                                     application online
  ---------------------------------------------------------------------

------------------------------------------------------------------------

## 🏗️ System Architecture

``` text
╔══════════════════════════════════════════════╗
║                 👤 USER                      ║
║        Login • Transactions • Budgets        ║
╚══════════════════════╦═══════════════════════╝
                       ║
                       ▼
╔══════════════════════════════════════════════╗
║            ⚛️ REACT FRONTEND                 ║
║   Dashboard • Forms • Charts • Insights      ║
║                 Netlify                      ║
╚══════════════════════╦═══════════════════════╝
                       ║
                 Axios / REST API
                       ║
                       ▼
╔══════════════════════════════════════════════╗
║          🚀 NODE.JS + EXPRESS API            ║
║ Authentication • Transactions • Budgets      ║
║ Analytics • Insights • Predictions           ║
║                  Render                      ║
╚══════════════════════╦═══════════════════════╝
                       ║
                    Mongoose
                       ║
                       ▼
╔══════════════════════════════════════════════╗
║             🗄️ MONGODB ATLAS                ║
║        Users • Transactions • Budgets        ║
╚══════════════════════════════════════════════╝
```

------------------------------------------------------------------------

## 🛠️ Tech Stack

  -----------------------------------------------------------------------
  Layer                   Technology              Purpose
  ----------------------- ----------------------- -----------------------
  ⚛️ Frontend R           eact.js + Vite B        uild the interactive
                                                  financial dashboard

  🔗 API Communication    Axios                   Connect the frontend
                                                  with REST APIs

  📊 Data Visualization   Chart.js                Display expense
                                                  distribution and
                                                  monthly trends

  🚀 Backend              Node.js + Express.js    Handle APIs and
                                                  application logic

  🗄️ Database M           ongoDB Atlas S          tore users,
                                                  transactions, and
                                                  budgets

  🔧 ODM                  Mongoose                Model and manage
                                                  MongoDB data

  🔐 Authentication       JWT + bcryptjs          Secure authentication
                                                  and password hashing

  🧠 Prediction           Simple Linear           Estimate future
                          Regression              expenses

  🌐 Frontend Hosting     Netlify                 Deploy the React
                                                  frontend

  ☁️ Backend Hosting R    ender D                 eploy the Node.js
                                                  backend
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 🔮 Expense Forecasting

FinSight includes a lightweight expense prediction module that analyzes
historical monthly spending data and estimates the expected expense for
the upcoming month.

``` text
📥 Historical Expense Data
          ↓
📅 Group Expenses by Month
          ↓
💰 Calculate Monthly Expense Totals
          ↓
📈 Analyze Spending Trend
          ↓
🧠 Apply Simple Linear Regression
          ↓
🔮 Predict Next-Month Expense
```

The prediction workflow groups historical expenses by month, calculates
monthly totals, and applies Simple Linear Regression to identify the
spending trend. The predicted value is returned through the backend API
and displayed on the financial dashboard.

------------------------------------------------------------------------

## ⚙️ How FinSight Works

``` text
1️⃣ User creates an account or logs in
              ↓
2️⃣ JWT verifies and protects the user
              ↓
3️⃣ User adds income and expense transactions
              ↓
4️⃣ Financial data is stored in MongoDB Atlas
              ↓
5️⃣ Express REST APIs process financial data
              ↓
6️⃣ Analytics services calculate spending trends
              ↓
7️⃣ Insight service analyzes financial activity
              ↓
8️⃣ Prediction service forecasts future expenses
              ↓
9️⃣ React dashboard displays the results
```

FinSight follows a client-server architecture. The React frontend sends
requests through Axios to the Express backend. Protected APIs process
user-specific financial data stored in MongoDB Atlas, while analytics,
insight, and prediction modules generate dashboard results.

------------------------------------------------------------------------

## 🔌 API Modules

  -----------------------------------------------------------------------
  API Module              Base Endpoint           Purpose
  ----------------------- ----------------------- -----------------------
  🔐 Authentication       `/api/auth`             Register and
                                                  authenticate users

  💳 Transactions         `/api/transactions`     Manage income and
                                                  expense transactions

  🎯 Budgets              `/api/budgets`          Manage category-wise
                                                  monthly budgets

  📊 Analytics            `/api/analytics`        Generate category and
                                                  monthly financial
                                                  analytics

  🧠 Insights             `/api/insights`         Generate personalized
                                                  financial observations

  🔮 Predictions          `/api/predictions`      Generate expense
                                                  forecasts
  -----------------------------------------------------------------------

------------------------------------------------------------------------

::: {align="center"}
### 💰 Track. Analyze. Predict.

**FinSight --- Understand your finances through data.**
:::
