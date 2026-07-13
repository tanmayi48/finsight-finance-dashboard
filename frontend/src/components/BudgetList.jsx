import { useState } from "react";

import api from "../services/api";

function BudgetList({
    budgets,
    onBudgetChanged
}) {
    const [editingBudgetId, setEditingBudgetId] =
        useState(null);

    const [newLimit, setNewLimit] = useState("");

    const getMonthName = (month) => {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        return months[month - 1];
    };

    const handleUpdate = async (budgetId) => {
        if (
            newLimit === "" ||
            Number(newLimit) <= 0
        ) {
            alert("Please enter a valid budget limit.");

            return;
        }

        try {
            await api.put(`/budgets/${budgetId}`, {
                limit: Number(newLimit)
            });

            setEditingBudgetId(null);
            setNewLimit("");

            onBudgetChanged();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                    "Failed to update budget"
            );
        }
    };

    const handleDelete = async (budgetId) => {
        const shouldDelete = window.confirm(
            "Are you sure you want to delete this budget?"
        );

        if (!shouldDelete) {
            return;
        }

        try {
            await api.delete(`/budgets/${budgetId}`);

            onBudgetChanged();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                    "Failed to delete budget"
            );
        }
    };

    const startEditing = (budget) => {
        setEditingBudgetId(budget._id);

        setNewLimit(budget.limit);
    };

    return (
        <div className="budget-section">
            <div className="section-heading">
                <h2>Monthly Budgets</h2>

                <span>
                    {budgets.length} budgets
                </span>
            </div>

            {budgets.length === 0 ? (
                <div className="empty-budget-card">
                    <h3>No budgets created</h3>

                    <p>
                        Create a monthly category budget to
                        monitor your spending.
                    </p>
                </div>
            ) : (
                <div className="budget-grid">
                    {budgets.map((budget) => {
                        const progressWidth = Math.min(
                            budget.usagePercentage,
                            100
                        );

                        return (
                            <div
                                className="budget-card"
                                key={budget._id}
                            >
                                <div className="budget-card-header">
                                    <div>
                                        <h3>
                                            {budget.category}
                                        </h3>

                                        <p>
                                            {getMonthName(
                                                budget.month
                                            )}{" "}
                                            {budget.year}
                                        </p>
                                    </div>

                                    <span
                                        className={`budget-status status-${budget.status.toLowerCase()}`}
                                    >
                                        {budget.status}
                                    </span>
                                </div>

                                <div className="budget-amount">
                                    <strong>
                                        ₹
                                        {budget.spent.toFixed(
                                            2
                                        )}
                                    </strong>

                                    <span>
                                        {" "}
                                        / ₹
                                        {budget.limit.toFixed(
                                            2
                                        )}
                                    </span>
                                </div>

                                <div className="progress-container">
                                    <div
                                        className={`progress-bar progress-${budget.status.toLowerCase()}`}
                                        style={{
                                            width: `${progressWidth}%`
                                        }}
                                    />
                                </div>

                                <div className="budget-percentage">
                                    {budget.usagePercentage.toFixed(
                                        2
                                    )}
                                    % used
                                </div>

                                <p className="budget-message">
                                    {budget.message}
                                </p>

                                {editingBudgetId ===
                                budget._id ? (
                                    <div className="budget-edit-area">
                                        <input
                                            type="number"
                                            value={newLimit}
                                            onChange={(event) =>
                                                setNewLimit(
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            min="0.01"
                                            step="0.01"
                                        />

                                        <button
                                            className="save-button"
                                            onClick={() =>
                                                handleUpdate(
                                                    budget._id
                                                )
                                            }
                                        >
                                            Save
                                        </button>

                                        <button
                                            className="cancel-button"
                                            onClick={() => {
                                                setEditingBudgetId(
                                                    null
                                                );

                                                setNewLimit("");
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div className="budget-actions">
                                        <button
                                            className="edit-button"
                                            onClick={() =>
                                                startEditing(
                                                    budget
                                                )
                                            }
                                        >
                                            Edit Limit
                                        </button>

                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(
                                                    budget._id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default BudgetList;