const generateInsights = require(
    "../services/insightService"
);

const getInsights = async (req, res) => {
    try {
        const insights = await generateInsights(
            req.user._id
        );

        res.status(200).json(insights);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to generate insights"
        });
    }
};

module.exports = {
    getInsights
};