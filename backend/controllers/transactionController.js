const Transaction = require("../models/transaction");

const categorizeTransaction = require(
    "../services/categorizationService"
);

// Add a new transaction
const addTransaction = async (req, res) => {
    try {
        const {
            title,
            amount,
            type,
            date
        } = req.body;

        // Check required fields
        if (!title || amount === undefined || !type) {
            return res.status(400).json({
                message: "Please provide title, amount and type"
            });
        }

        // Validate amount
        if (Number(amount) <= 0) {
            return res.status(400).json({
                message: "Amount must be greater than 0"
            });
        }

        // Validate transaction type
        if (!["income", "expense"].includes(type)) {
            return res.status(400).json({
                message: "Type must be income or expense"
            });
        }

        // Automatically detect category
        const category = categorizeTransaction(
            title,
            type
        );

        // Create transaction
        const transaction = await Transaction.create({
            user: req.user._id,
            title,
            amount,
            type,
            category,
            date: date || Date.now()
        });

        res.status(201).json(transaction);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// Get logged-in user's transactions
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            user: req.user._id
        }).sort({
            date: -1
        });

        res.status(200).json(transactions);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// Update a transaction
const updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(
            req.params.id
        );

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        // Check transaction ownership
        if (
            transaction.user.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "Not authorized to update this transaction"
            });
        }

        const {
            title,
            amount,
            type,
            date
        } = req.body;

        // Validate amount if provided
        if (
            amount !== undefined &&
            Number(amount) <= 0
        ) {
            return res.status(400).json({
                message: "Amount must be greater than 0"
            });
        }

        // Validate type if provided
        if (
            type &&
            !["income", "expense"].includes(type)
        ) {
            return res.status(400).json({
                message: "Type must be income or expense"
            });
        }

        transaction.title =
            title !== undefined
                ? title
                : transaction.title;

        transaction.amount =
            amount !== undefined
                ? amount
                : transaction.amount;

        transaction.type =
            type !== undefined
                ? type
                : transaction.type;

        transaction.date =
            date !== undefined
                ? date
                : transaction.date;

        // Recalculate category
        transaction.category = categorizeTransaction(
            transaction.title,
            transaction.type
        );

        const updatedTransaction =
            await transaction.save();

        res.status(200).json(updatedTransaction);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(
            req.params.id
        );

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        // Check transaction ownership
        if (
            transaction.user.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "Not authorized to delete this transaction"
            });
        }

        await transaction.deleteOne();

        res.status(200).json({
            message: "Transaction deleted successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    addTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction
};