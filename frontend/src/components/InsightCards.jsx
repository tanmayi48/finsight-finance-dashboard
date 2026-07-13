function InsightCards({ insights }) {
    const getInsightIcon = (type) => {
        switch (type) {
            case "success":
                return "💰";

            case "warning":
                return "⚠️";

            case "danger":
                return "🚨";

            case "info":
                return "📊";

            default:
                return "💡";
        }
    };

    return (
        <div className="insight-section">
            <div className="section-heading">
                <div>
                    <h2>Personalized Financial Insights</h2>

                    <p className="insight-description">
                        Smart observations generated from
                        your financial activity.
                    </p>
                </div>

                <span>
                    {insights.length} insights
                </span>
            </div>

            {insights.length === 0 ? (
                <div className="empty-insight-card">
                    No financial insights available.
                </div>
            ) : (
                <div className="insight-grid">
                    {insights.map((insight, index) => (
                        <div
                            className={`insight-card insight-${insight.type}`}
                            key={`${insight.title}-${index}`}
                        >
                            <div className="insight-icon">
                                {getInsightIcon(
                                    insight.type
                                )}
                            </div>

                            <div>
                                <h3>{insight.title}</h3>

                                <p>{insight.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default InsightCards;