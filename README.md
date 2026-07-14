::: {align="center"}
# FinSight

### Intelligent Personal Finance Analytics & Expense Forecasting Platform

A full-stack financial analytics platform for tracking transactions,
managing budgets, analyzing spending patterns, and forecasting future
expenses.

**[Live Demo](https://finsightfinancedashboard.netlify.app/) · [Report
an
Issue](https://github.com/tanmayi48/finsight-finance-dashboard/issues)**
:::

------------------------------------------------------------------------

## Overview

FinSight is a MERN-based personal finance dashboard designed to turn
everyday transaction data into useful financial information.

The platform allows users to securely manage income and expenses, define
category-wise monthly budgets, visualize financial trends, receive
rule-based spending insights, and estimate upcoming expenses from
historical monthly spending data.

The project focuses on full-stack application development, REST API
design, authentication, financial data aggregation, analytics, and cloud
deployment.

## Key Features

-   **Secure Authentication** --- User registration and login with
    JWT-based authentication and bcrypt password hashing.
-   **Transaction Management** --- Add and delete income or expense
    transactions with category and date information.
-   **Financial Summary** --- Automatically calculate total income,
    total expenses, and available balance.
-   **Budget Tracking** --- Create monthly category-wise budgets and
    compare planned spending with financial activity.
-   **Expense Analytics** --- Analyze category-wise spending and monthly
    income/expense trends.
-   **Interactive Visualizations** --- Display financial data through
    Chart.js-based dashboard charts.
-   **Personalized Insights** --- Generate financial observations from
    transaction and budget data.
-   **Expense Forecasting** --- Estimate next-month expenses using
    Simple Linear Regression on historical monthly spending.
-   **Responsive Dashboard** --- Modern interface designed for desktop
    and mobile access.
-   **Cloud Deployment** --- Frontend, backend, and database deployed as
    a complete production-style web application.

## Architecture

``` text
                    USER
                      |
                      v
          +-----------------------+
          |   React + Vite UI     |
          |      Netlify          |
          +-----------------------+
                      |
                 Axios / REST
                      |
                      v
          +-----------------------+
          | Node.js + Express API |
          |        Render         |
          +-----------------------+
                      |
              Mongoose ODM
                      |
                      v
          +-----------------------+
          |    MongoDB Atlas      |
          |    Cloud Database     |
          +-----------------------+
```

## Tech Stack

  Layer                 Technologies
  --------------------- --------------------------------
  Frontend              React.js, Vite, React Router
  API Communication     Axios
  Data Visualization    Chart.js, react-chartjs-2
  Backend               Node.js, Express.js
  Database              MongoDB Atlas, Mongoose
  Authentication        JSON Web Token (JWT), bcryptjs
  Forecasting           Simple Linear Regression
  Frontend Deployment   Netlify
  Backend Deployment    Render
  Version Control       Git, GitHub

## Expense Forecasting

FinSight includes a lightweight forecasting module that analyzes
historical monthly expense totals.

The service:

1.  Aggregates expense transactions by month.
2.  Converts monthly spending history into sequential data points.
3.  Applies Simple Linear Regression to identify the spending trend.
4.  Estimates the expected expense for the next month.
5.  Returns the prediction through a REST API endpoint for dashboard
    visualization.

This feature demonstrates the integration of a basic predictive
technique into a full-stack MERN workflow.

## Core Modules

``` text
Authentication
     |
     +-- User Registration
     +-- Password Hashing
     +-- JWT Generation
     +-- Protected Routes

Transactions
     |
     +-- Add Income / Expense
     +-- Fetch User Transactions
     +-- Delete Transactions

Budgets
     |
     +-- Create Monthly Budget
     +-- Category-wise Budget Tracking

Analytics
     |
     +-- Category Expense Aggregation
     +-- Monthly Financial Trends
     +-- Dashboard Visualizations

Insights
     |
     +-- Transaction Analysis
     +-- Budget-based Observations

Prediction
     |
     +-- Historical Expense Aggregation
     +-- Linear Regression
     +-- Next-month Expense Forecast
```

## Project Structure

``` text
finsight-finance-dashboard/
|
+-- backend/
|   +-- controllers/
|   +-- middleware/
|   +-- models/
|   +-- routes/
|   +-- services/
|   +-- utils/
|   +-- server.js
|   +-- package.json
|
+-- frontend/
|   +-- public/
|   +-- src/
|   |   +-- components/
|   |   +-- context/
|   |   +-- pages/
|   |   +-- services/
|   |   +-- utils/
|   |   +-- App.jsx
|   |   +-- main.jsx
|   +-- package.json
|
+-- .gitignore
+-- README.md
```

## Screenshots

> Project screenshots will be added here to showcase the authentication
> interface, financial dashboard, analytics charts, insights, and
> expense prediction feature.

Recommended screenshot structure:

``` text
screenshots/
|
+-- login.png
+-- dashboard.png
+-- analytics.png
```

After adding the images, this section can use:

``` text
![FinSight Login](screenshots/login.png)

![FinSight Dashboard](screenshots/dashboard.png)

![FinSight Analytics](screenshots/analytics.png)
```

## REST API Overview

  -----------------------------------------------------------------------
  Module                  Base Route              Purpose
  ----------------------- ----------------------- -----------------------
  Authentication          `/api/auth`             Register and
                                                  authenticate users

  Transactions            `/api/transactions`     Manage financial
                                                  transactions

  Budgets                 `/api/budgets`          Manage monthly budgets

  Analytics               `/api/analytics`        Generate financial
                                                  analytics

  Insights                `/api/insights`         Generate personalized
                                                  financial observations

  Predictions             `/api/predictions`      Generate expense
                                                  forecasts
  -----------------------------------------------------------------------

## Getting Started

### Prerequisites

Install:

-   Node.js
-   npm
-   Git

A MongoDB Atlas database is also required.

### Clone the Repository

``` bash
git clone https://github.com/tanmayi48/finsight-finance-dashboard.git
cd finsight-finance-dashboard
```

### Backend Setup

``` bash
cd backend
npm install
```

Create a `.env` file inside `backend`:

``` env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend:

``` bash
npm run dev
```

### Frontend Setup

Open another terminal:

``` bash
cd frontend
npm install
npm run dev
```

For local development, configure the Axios API base URL in:

``` text
frontend/src/services/api.js
```

to point to the locally running backend.

## Security

FinSight applies the following backend security practices:

-   Password hashing with bcryptjs
-   JWT-based authentication
-   Authentication middleware for protected API routes
-   User-specific financial data access
-   Environment variables for sensitive configuration
-   `.env` files excluded from Git version control

## Deployment

The application uses a separated cloud deployment architecture:

``` text
Frontend  -> Netlify
Backend   -> Render
Database  -> MongoDB Atlas
```

The deployed React frontend communicates with the Render-hosted REST
API, which manages authentication, application logic, analytics,
forecasting, and MongoDB Atlas access.

## Future Improvements

-   Recurring transaction support
-   Savings goals and progress tracking
-   Advanced forecasting with larger historical datasets
-   Spending anomaly detection
-   CSV and PDF financial report exports
-   Email-based budget notifications
-   Multi-currency support
-   More advanced personalized financial recommendations

## Author

**Tanmayi P**

Information Science and Engineering Student

**GitHub:** https://github.com/tanmayi48

------------------------------------------------------------------------

::: {align="center"}
Built as a full-stack MERN project focused on financial analytics and
expense forecasting.
:::
