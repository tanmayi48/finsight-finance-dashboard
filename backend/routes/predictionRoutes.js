const express = require("express");

const {
    getExpensePrediction
} = require("../controllers/predictionController");

const protect = require(
    "../middleware/authMiddleware"
);

const router = express.Router();

router.get(
    "/expenses",
    protect,
    getExpensePrediction
);

module.exports = router;