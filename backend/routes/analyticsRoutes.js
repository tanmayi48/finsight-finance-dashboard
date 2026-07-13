const express = require("express");

const {
    getCategoryAnalytics,
    getMonthlyAnalytics
} = require("../controllers/analyticsController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
    "/categories",
    protect,
    getCategoryAnalytics
);

router.get(
    "/monthly",
    protect,
    getMonthlyAnalytics
);

module.exports = router;