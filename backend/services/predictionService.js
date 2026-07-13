const {
    SimpleLinearRegression
} = require("ml-regression-simple-linear");

const Transaction = require(
    "../models/transaction"
);

const predictNextMonthExpense = async (userId) => {
    const monthlyExpenses = await Transaction.aggregate([
        {
            $match: {
                user: userId,
                type: "expense"
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
                    }
                },
                totalExpense: {
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

    console.log(
        "Monthly Expenses:",
        monthlyExpenses
    );

    if (monthlyExpenses.length < 3) {
        return {
            predictionAvailable: false,
            message:
                "At least 3 months of expense data is required for prediction."
        };
    }

    const x = monthlyExpenses.map(
        (_, index) => index + 1
    );

    const y = monthlyExpenses.map(
        (item) => item.totalExpense
    );

    console.log("X values:", x);
    console.log("Y values:", y);

    const regression =
        new SimpleLinearRegression(x, y);

    const nextMonthIndex =
        monthlyExpenses.length + 1;

    let predictedExpense = regression.predict(
        nextMonthIndex
    );

    predictedExpense = Math.max(
        predictedExpense,
        0
    );

    const lastRecord =
        monthlyExpenses[
            monthlyExpenses.length - 1
        ];

    let nextMonth =
        lastRecord._id.month + 1;

    let nextYear =
        lastRecord._id.year;

    if (nextMonth > 12) {
        nextMonth = 1;
        nextYear += 1;
    }

    return {
        predictionAvailable: true,

        predictedExpense: Number(
            predictedExpense.toFixed(2)
        ),

        nextMonth,

        nextYear,

        monthsAnalyzed:
            monthlyExpenses.length,

        historicalData:
            monthlyExpenses.map((item) => ({
                year: item._id.year,
                month: item._id.month,
                expense: item.totalExpense
            }))
    };
};

module.exports = predictNextMonthExpense;