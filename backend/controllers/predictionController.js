const predictNextMonthExpense = require(
    "../services/predictionService"
);

const getExpensePrediction = async (req, res) => {
    try {
        const prediction =
            await predictNextMonthExpense(
                req.user._id
            );

        res.status(200).json(prediction);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message:
                "Failed to generate expense prediction"
        });
    }
};

module.exports = {
    getExpensePrediction
};