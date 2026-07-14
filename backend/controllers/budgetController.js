const Budget = require("../models/budget");
const Transaction = require("../models/transaction");

// Create or update monthly budget
const createBudget = async (req, res) => {
    try {
        const {
            category,
            limit,
            month,
            year
        } = req.body;

        // Validate required fields
        if (
            !category ||
            limit === undefined ||
            !month ||
            !year
        ) {
            return res.status(400).json({
                message:
                    "Please provide category, limit, month and year"
            });
        }

        // Convert limit to number
        const budgetLimit = Number(limit);

        // Validate budget limit
        if (
            Number.isNaN(budgetLimit) ||
            budgetLimit <= 0
        ) {
            return res.status(400).json({
                message:
                    "Budget limit must be greater than 0"
            });
        }

        // Check whether budget already exists
        const existingBudget = await Budget.findOne({
            user: req.user._id,
            category,
            month,
            year
        });

        // Update existing budget
        if (existingBudget) {
            existingBudget.limit = budgetLimit;

            const updatedBudget =
                await existingBudget.save();

            return res.status(200).json({
                message:
                    "Budget updated successfully",
                budget: updatedBudget
            });
        }

        // Create new budget
        const budget = await Budget.create({
            user: req.user._id,
            category,
            limit: budgetLimit,
            month,
            year
        });

        return res.status(201).json({
            message:
                "Budget created successfully",
            budget
        });
    } catch (error) {
        console.error(
            "Create Budget Error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to create budget"
        });
    }
};


// Get all budgets of logged-in user
const getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({
            user: req.user._id
        }).sort({
            year: -1,
            month: -1
        });

        return res.status(200).json(budgets);
    } catch (error) {
        console.error(
            "Get Budgets Error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to load budgets"
        });
    }
};


// Get budget usage
const getBudgetUsage = async (req, res) => {
    try {
        const budgets = await Budget.find({
            user: req.user._id
        });

        const budgetUsage = await Promise.all(
            budgets.map(async (budget) => {
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

                const transactions =
                    await Transaction.find({
                        user: req.user._id,
                        type: "expense",
                        category: budget.category,
                        date: {
                            $gte: startDate,
                            $lt: endDate
                        }
                    });

                const spent = transactions.reduce(
                    (total, transaction) =>
                        total + transaction.amount,
                    0
                );

                const remaining =
                    budget.limit - spent;

                const percentage =
                    budget.limit > 0
                        ? (spent / budget.limit) * 100
                        : 0;

                return {
                    _id: budget._id,
                    category: budget.category,
                    limit: budget.limit,
                    month: budget.month,
                    year: budget.year,
                    spent,
                    remaining,
                    percentage: Number(
                        percentage.toFixed(2)
                    )
                };
            })
        );

        return res.status(200).json(budgetUsage);
    } catch (error) {
        console.error(
            "Budget Usage Error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to calculate budget usage"
        });
    }
};


// Delete budget
const deleteBudget = async (req, res) => {
    try {
        const budget = await Budget.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!budget) {
            return res.status(404).json({
                message: "Budget not found"
            });
        }

        await budget.deleteOne();

        return res.status(200).json({
            message:
                "Budget deleted successfully"
        });
    } catch (error) {
        console.error(
            "Delete Budget Error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to delete budget"
        });
    }
};


module.exports = {
    createBudget,
    getBudgets,
    getBudgetUsage,
    deleteBudget
};