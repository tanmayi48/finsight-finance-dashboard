const Transaction = require("../models/transaction");

const getBudgetStatus = async (budget) => {
    const startDate = new Date(
        budget.year,
        budget.month - 1,
        1
    );

    const endDate = new Date(
        budget.year,
        budget.month,
        1
    );

    const result = await Transaction.aggregate([
        {
            $match: {
                user: budget.user,
                category: budget.category,
                type: "expense",
                date: {
                    $gte: startDate,
                    $lt: endDate
                }
            }
        },
        {
            $group: {
                _id: null,
                totalSpent: {
                    $sum: "$amount"
                }
            }
        }
    ]);

    const spent =
        result.length > 0
            ? result[0].totalSpent
            : 0;

    const usagePercentage =
        (spent / budget.limit) * 100;

    let status = "Safe";
    let message = "Your spending is within budget.";

    if (usagePercentage >= 100) {
        status = "Exceeded";

        message = `Budget exceeded by ₹${(
            spent - budget.limit
        ).toFixed(2)}.`;
    } else if (usagePercentage >= 90) {
        status = "Critical";

        message =
            "You are very close to exceeding your budget.";
    } else if (usagePercentage >= 70) {
        status = "Warning";

        message = `You have used ${usagePercentage.toFixed(
            1
        )}% of your budget.`;
    }

    return {
        spent,
        usagePercentage: Number(
            usagePercentage.toFixed(2)
        ),
        status,
        message
    };
};

module.exports = getBudgetStatus;