import { useState } from "react";

import api from "../services/api";

function TransactionForm({ onTransactionAdded }) {
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        type: "expense"
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            await api.post("/transactions", {
                title: formData.title,
                amount: Number(formData.amount),
                type: formData.type
            });

            setFormData({
                title: "",
                amount: "",
                type: "expense"
            });

            onTransactionAdded();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "Failed to add transaction"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="transaction-form-card">
            <h2>Add Transaction</h2>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Transaction Title</label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Example: Swiggy Dinner"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Amount</label>

                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Enter amount"
                        min="0.01"
                        step="0.01"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Type</label>

                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option value="expense">
                            Expense
                        </option>

                        <option value="income">
                            Income
                        </option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="primary-button"
                    disabled={loading}
                >
                    {loading
                        ? "Adding..."
                        : "Add Transaction"}
                </button>
            </form>
        </div>
    );
}

export default TransactionForm;