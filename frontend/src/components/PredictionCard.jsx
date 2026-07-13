function PredictionCard({ prediction }) {
    const monthNames = [
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

    if (!prediction) {
        return null;
    }

    return (
        <div className="prediction-card">
            <div className="prediction-header">
                <div>
                    <h2>AI Expense Forecast</h2>

                    <p>
                        Linear regression-based spending
                        prediction.
                    </p>
                </div>

                <span className="ml-badge">
                    ML Forecast
                </span>
            </div>

            {!prediction.predictionAvailable ? (
                <div className="prediction-unavailable">
                    <h3>Prediction Not Available</h3>

                    <p>{prediction.message}</p>
                </div>
            ) : (
                <div className="prediction-content">
                    <div>
                        <p className="prediction-label">
                            Predicted Expense for{" "}
                            {
                                monthNames[
                                    prediction.nextMonth - 1
                                ]
                            }{" "}
                            {prediction.nextYear}
                        </p>

                        <h3 className="prediction-amount">
                            ₹
                            {prediction.predictedExpense.toFixed(
                                2
                            )}
                        </h3>
                    </div>

                    <div className="prediction-info">
                        <strong>
                            {prediction.monthsAnalyzed}
                        </strong>

                        <span>
                            months of historical data analyzed
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PredictionCard;