const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication routes
app.use(
    "/api/auth",
    require("./routes/authRoutes")
);

// Transaction routes
app.use(
    "/api/transactions",
    require("./routes/transactionRoutes")
);

// Budget routes
app.use(
    "/api/budgets",
    require("./routes/budgetRoutes")
);

// Analytics routes
app.use(
    "/api/analytics",
    require("./routes/analyticsRoutes")
);
// Financial insight routes
app.use(
    "/api/insights",
    require("./routes/insightRoutes")
);
// Expense prediction routes
app.use(
    "/api/predictions",
    require("./routes/predictionRoutes")
);

app.get("/", (req, res) => {
    res.send("FinSight API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});