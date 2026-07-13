function SummaryCards({
    totalIncome,
    totalExpenses,
    balance
}) {
    return (
        <div className="summary-grid">
            <div className="summary-card">
                <p>Total Income</p>

                <h2 className="income-text">
                    ₹{totalIncome.toFixed(2)}
                </h2>
            </div>

            <div className="summary-card">
                <p>Total Expenses</p>

                <h2 className="expense-text">
                    ₹{totalExpenses.toFixed(2)}
                </h2>
            </div>

            <div className="summary-card">
                <p>Current Balance</p>

                <h2>
                    ₹{balance.toFixed(2)}
                </h2>
            </div>
        </div>
    );
}

export default SummaryCards;