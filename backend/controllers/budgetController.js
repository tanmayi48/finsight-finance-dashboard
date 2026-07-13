const Budget = require("../models/budget");

const getBudgetStatus = require(
    "../services/budgetService"
);

// Create budget
const createBudget = async (req, res) => {
    try {
        const {
            category,
            limit,
            month,
            year
        } = req.body;

        if (
            !category ||
            limit === undefined ||
            month === undefined ||
            year === undefined
        ) {
            return res.status(400).json({
                message:
                    "Please provide category, limit, month and year"
            });
        }

        if (Number(limit) <= 0) {
            return res.status(400).json({
                message:
                    "Budget limit must be greater than 0"
            });
        }

        if (
            Number(month) < 1 ||
            Number(month) > 12
        ) {
            return res.status(400).json({
                message:
                    "Month must be between 1 and 12"
            });
        }

        const existingBudget = await Budget.findOne({
            user: req.user._id,
            category,
            month,
            year
        });

        if (existingBudget) {
            return res.status(400).json({
                message:
                    "Budget already exists for this category and month"
            });
        }

        const budget = await Budget.create({
            user: req.user._id,
            category,
            limit,
            month,
            year
        });

        const budgetStatus =
            await getBudgetStatus(budget);

        res.status(201).json({
            budget,
            ...budgetStatus
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// Get logged-in user's budgets
const getBudgets = async (req, res) => {
    try {
        const filter = {
            user: req.user._id
        };

        if (req.query.month) {
            filter.month = Number(req.query.month);
        }

        if (req.query.year) {
            filter.year = Number(req.query.year);
        }

        const budgets = await Budget.find(filter).sort({
            year: -1,
            month: -1
        });

        const budgetsWithStatus = await Promise.all(
            budgets.map(async (budget) => {
                const status =
                    await getBudgetStatus(budget);

                return {
                    _id: budget._id,
                    category: budget.category,
                    limit: budget.limit,
                    month: budget.month,
                    year: budget.year,
                    ...status
                };
            })
        );

        res.status(200).json(budgetsWithStatus);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// Update budget
const updateBudget = async (req, res) => {
    try {
        const budget = await Budget.findById(
            req.params.id
        );

        if (!budget) {
            return res.status(404).json({
                message: "Budget not found"
            });
        }

        if (
            budget.user.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message:
                    "Not authorized to update this budget"
            });
        }

        const { limit } = req.body;

        if (
            limit === undefined ||
            Number(limit) <= 0
        ) {
            return res.status(400).json({
                message:
                    "Please provide a valid budget limit"
            });
        }

        budget.limit = limit;

        const updatedBudget = await budget.save();

        const budgetStatus =
            await getBudgetStatus(updatedBudget);

        res.status(200).json({
            budget: updatedBudget,
            ...budgetStatus
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// Delete budget
const deleteBudget = async (req, res) => {
    try {
        const budget = await Budget.findById(
            req.params.id
        );

        if (!budget) {
            return res.status(404).json({
                message: "Budget not found"
            });
        }

        if (
            budget.user.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message:
                    "Not authorized to delete this budget"
            });
        }

        await budget.deleteOne();

        res.status(200).json({
            message: "Budget deleted successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    createBudget,
    getBudgets,
    updateBudget,
    deleteBudget
};