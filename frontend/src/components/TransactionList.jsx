import api from "../services/api";

function TransactionList({
    transactions,
    onTransactionChanged,
}) {
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/transactions/${id}`);

            await onTransactionChanged();
        } catch (error) {
            console.error(
                "Failed to delete transaction:",
                error
            );

            alert("Failed to delete transaction");
        }
    };

    return (
        <div className="transaction-list-card">
            <div className="transaction-list-header">
                <div>
                    <h2>Recent Transactions</h2>

                    <p>
                        View and manage your recent income
                        and expenses.
                    </p>
                </div>

                <span className="transaction-count">
                    {transactions.length} transactions
                </span>
            </div>

            {transactions.length === 0 ? (
                <div className="no-transactions">
                    <h3>No Transactions Yet</h3>

                    <p>
                        Add your first income or expense
                        transaction.
                    </p>
                </div>
            ) : (
                <div className="transaction-table-wrapper">
                    <table className="transaction-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {transactions.map(
                                (transaction) => (
                                    <tr key={transaction._id}>
                                        <td className="transaction-title">
                                            {transaction.title}
                                        </td>

                                        <td>
                                            <span className="category-badge">
                                                {transaction.category}
                                            </span>
                                        </td>

                                        <td>
                                            <span
                                                className={`type-badge ${
                                                    transaction.type ===
                                                    "income"
                                                        ? "income-type"
                                                        : "expense-type"
                                                }`}
                                            >
                                                {transaction.type}
                                            </span>
                                        </td>

                                        <td className="transaction-date">
                                            {new Date(
                                                transaction.date
                                            ).toLocaleDateString()}
                                        </td>

                                        <td
                                            className={
                                                transaction.type ===
                                                "income"
                                                    ? "income-amount"
                                                    : "expense-amount"
                                            }
                                        >
                                            {transaction.type ===
                                            "income"
                                                ? "+"
                                                : "-"}
                                            ₹
                                            {Number(
                                                transaction.amount
                                            ).toFixed(2)}
                                        </td>

                                        <td>
                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleDelete(
                                                        transaction._id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default TransactionList;