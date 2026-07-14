import api from "../services/api";

function BudgetList({
    budgets,
    onBudgetDeleted
}) {
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

    const handleDelete = async (budgetId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this budget?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(
                `/budgets/${budgetId}`
            );

            if (onBudgetDeleted) {
                await onBudgetDeleted();
            }
        } catch (error) {
            console.error(
                "Delete Budget Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                    "Failed to delete budget"
            );
        }
    };

    if (!budgets || budgets.length === 0) {
        return (
            <div className="budget-list-card">
                <div className="budget-list-header">
                    <h2>Monthly Budgets</h2>

                    <p>
                        Your category-wise spending limits.
                    </p>
                </div>

                <p className="no-budget-message">
                    No budgets created yet.
                </p>
            </div>
        );
    }

    return (
        <div className="budget-list-card">
            <div className="budget-list-header">
                <div>
                    <h2>Monthly Budgets</h2>

                    <p>
                        Track your category-wise spending
                        limits.
                    </p>
                </div>

                <span className="budget-count">
                    {budgets.length} budgets
                </span>
            </div>

            <div className="budget-grid">
                {budgets.map((budget) => (
                    <div
                        className="budget-item"
                        key={budget._id}
                    >
                        <div className="budget-item-top">
                            <div>
                                <h3>
                                    {budget.category}
                                </h3>

                                <p>
                                    {
                                        months[
                                            Number(
                                                budget.month
                                            ) - 1
                                        ]
                                    }{" "}
                                    {budget.year}
                                </p>
                            </div>

                            <span className="budget-amount">
                                ₹
                                {Number(
                                    budget.limit
                                ).toFixed(2)}
                            </span>
                        </div>

                        <button
                            className="budget-delete-button"
                            onClick={() =>
                                handleDelete(
                                    budget._id
                                )
                            }
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BudgetList;