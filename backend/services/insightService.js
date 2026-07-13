const Transaction = require("../models/transaction");
const Budget = require("../models/budget");

const generateInsights = async (userId) => {
    const transactions = await Transaction.find({
        user: userId
    });

    const budgets = await Budget.find({
        user: userId
    });

    const insights = [];

    // Calculate total income
    const totalIncome = transactions
        .filter(
            (transaction) =>
                transaction.type === "income"
        )
        .reduce(
            (total, transaction) =>
                total + transaction.amount,
            0
        );

    // Calculate total expenses
    const totalExpenses = transactions
        .filter(
            (transaction) =>
                transaction.type === "expense"
        )
        .reduce(
            (total, transaction) =>
                total + transaction.amount,
            0
        );

    // Savings rate insight
    if (totalIncome > 0) {
        const savings = totalIncome - totalExpenses;

        const savingsRate =
            (savings / totalIncome) * 100;

        if (savingsRate >= 50) {
            insights.push({
                type: "success",
                title: "Excellent Savings Rate",
                message: `You saved ${savingsRate.toFixed(
                    2
                )}% of your income. Your savings performance is excellent.`
            });
        } else if (savingsRate >= 20) {
            insights.push({
                type: "info",
                title: "Good Savings Rate",
                message: `You saved ${savingsRate.toFixed(
                    2
                )}% of your income. You are maintaining a healthy savings rate.`
            });
        } else if (savingsRate >= 0) {
            insights.push({
                type: "warning",
                title: "Low Savings Rate",
                message: `Your savings rate is ${savingsRate.toFixed(
                    2
                )}%. Consider reducing unnecessary expenses.`
            });
        } else {
            insights.push({
                type: "danger",
                title: "Negative Savings",
                message: `Your expenses exceed your income by ₹${Math.abs(
                    savings
                ).toFixed(2)}. Review your spending immediately.`
            });
        }
    }

    // Category-wise expense calculation
    const categoryExpenses = {};

    transactions
        .filter(
            (transaction) =>
                transaction.type === "expense"
        )
        .forEach((transaction) => {
            if (!categoryExpenses[transaction.category]) {
                categoryExpenses[transaction.category] = 0;
            }

            categoryExpenses[transaction.category] +=
                transaction.amount;
        });

    const categoryEntries = Object.entries(
        categoryExpenses
    );

    // Highest spending category
    if (categoryEntries.length > 0) {
        const highestCategory = categoryEntries.reduce(
            (highest, current) =>
                current[1] > highest[1]
                    ? current
                    : highest
        );

        insights.push({
            type: "info",
            title: "Highest Spending Category",
            message: `${highestCategory[0]} is your highest spending category with ₹${highestCategory[1].toFixed(
                2
            )} spent.`
        });
    }

    // Expense-to-income analysis
    if (totalIncome > 0) {
        const expensePercentage =
            (totalExpenses / totalIncome) * 100;

        if (expensePercentage <= 50) {
            insights.push({
                type: "success",
                title: "Expenses Under Control",
                message: `You are spending ${expensePercentage.toFixed(
                    2
                )}% of your income. Your expenses are currently under control.`
            });
        } else if (expensePercentage <= 80) {
            insights.push({
                type: "warning",
                title: "Moderate Spending",
                message: `You are spending ${expensePercentage.toFixed(
                    2
                )}% of your income. Monitor your expenses carefully.`
            });
        } else {
            insights.push({
                type: "danger",
                title: "High Expense Ratio",
                message: `You are spending ${expensePercentage.toFixed(
                    2
                )}% of your income. Consider reducing your expenses.`
            });
        }
    }

    // Budget insights
    for (const budget of budgets) {
        const spent = transactions
            .filter((transaction) => {
                const transactionDate = new Date(
                    transaction.date
                );

                return (
                    transaction.type === "expense" &&
                    transaction.category ===
                        budget.category &&
                    transactionDate.getMonth() + 1 ===
                        budget.month &&
                    transactionDate.getFullYear() ===
                        budget.year
                );
            })
            .reduce(
                (total, transaction) =>
                    total + transaction.amount,
                0
            );

        const usagePercentage =
            (spent / budget.limit) * 100;

        if (usagePercentage > 100) {
            insights.push({
                type: "danger",
                title: `${budget.category} Budget Exceeded`,
                message: `You exceeded your ${budget.category} budget by ₹${(
                    spent - budget.limit
                ).toFixed(2)}.`
            });
        } else if (usagePercentage >= 80) {
            insights.push({
                type: "warning",
                title: `${budget.category} Budget Alert`,
                message: `You have used ${usagePercentage.toFixed(
                    2
                )}% of your ${budget.category} budget.`
            });
        }
    }

    // No data insight
    if (transactions.length === 0) {
        insights.push({
            type: "info",
            title: "Start Tracking Your Finances",
            message:
                "Add your first transaction to receive personalized financial insights."
        });
    }

    return insights;
};

module.exports = generateInsights;