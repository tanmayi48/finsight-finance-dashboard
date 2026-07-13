const Transaction = require("../models/transaction");

// Get category-wise expense analytics
const getCategoryAnalytics = async (req, res) => {
    try {
        const result = await Transaction.aggregate([
            {
                $match: {
                    user: req.user._id,
                    type: "expense"
                }
            },
            {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: "$amount"
                    }
                }
            },
            {
                $sort: {
                    total: -1
                }
            }
        ]);

        const analytics = result.map((item) => ({
            category: item._id,
            total: item.total
        }));

        res.status(200).json(analytics);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// Get monthly income and expense analytics
const getMonthlyAnalytics = async (req, res) => {
    try {
        const result = await Transaction.aggregate([
            {
                $match: {
                    user: req.user._id
                }
            },
            {
                $group: {
                    _id: {
                        year: {
                            $year: "$date"
                        },
                        month: {
                            $month: "$date"
                        },
                        type: "$type"
                    },
                    total: {
                        $sum: "$amount"
                    }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            }
        ]);

        const monthlyData = {};

        result.forEach((item) => {
            const key = `${item._id.year}-${item._id.month}`;

            if (!monthlyData[key]) {
                monthlyData[key] = {
                    year: item._id.year,
                    month: item._id.month,
                    income: 0,
                    expense: 0
                };
            }

            monthlyData[key][item._id.type] =
                item.total;
        });

        res.status(200).json(
            Object.values(monthlyData)
        );
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getCategoryAnalytics,
    getMonthlyAnalytics
};